
import { Request, Response, NextFunction } from 'express'
import Bill from '../models/bill.model';
import BillDetail from '../models/bill.detail.model';
import CustomDate from '../services/customdate';
import { sequelize } from '../database';
import Results, { Code, Message } from '../services/message-statusCode';
import Product from '../models/product.model';

export default class SaleController {

  public static add = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const { user_id } = req.query
    let itemList: Array<any> = req.body

    /**
     * CHECK SALE LIST
     */
    
    if (itemList.length <= 0) {
      res.status(Code.NoContent).json(Results.Fail("No Item List For Add.", []))
      return;
    }

    /**
     *  GENERATE BILL NUMBER
     */
    const generateBillNumber = () => {
      return +new Date();
    }
    try {
      /**
       * CALULATE BILL PRICE
       */
      let bill_price: number = 0
      for (let i = 0; i < itemList.length; i++) {
        bill_price += parseInt(itemList[i].price) * parseInt(itemList[i].quantity)
      }
      /**
       * BILL DATA
       */
      const billData: object = {
        bill_number: generateBillNumber(),
        bill_date: CustomDate.getDate(),
        bill_time: CustomDate.getTime(),
        user_id: user_id,
        bill_price: bill_price
      }
      const stock: Array<any> = [];
      const product_id: Array<any> = [];

      for (let i = 0; i < itemList.length; i++) {
        product_id.push(itemList[i].product_id)
      }

      const productList: Product[] = await Product.findAll(
        {
          attributes: ["product_id", "quantity"],
          where: { product_id: product_id },
        })
      const stf = JSON.stringify(productList)
      const productList2 = JSON.parse(stf)

      for (let j = 0; j < itemList.length; j++) {
        stock.push(
          {
            product_id: itemList[j].product_id,
            quantity: parseInt(productList2[j].quantity) - parseInt(itemList[j].quantity)
          }
        )
      }

      let billDetailData: Array<object> = [];

      await sequelize.transaction(async t => {


        /**
         * ADD BILL DATA TO BILL => TRANSACTION 1
         */
        const bill: Bill | null = await Bill.create(billData, { transaction: t })

        /**
         * BILLDETAIL DATA
         */
        for (let i = 0; i < itemList.length; i++) {
          billDetailData.push({
            quantity: itemList[i].quantity,
            bill_dt_date: CustomDate.getDate(),
            bill_dt_time: CustomDate.getTime(),
            bill_id: bill.bill_id,
            product_id: itemList[i].product_id
          })
        }

        /**
         * ADD BILL DETAIL DATA TO BILLL DETAIL => TRANSACTION 2
         */
        const billDetail: BillDetail[] = await BillDetail.bulkCreate(billDetailData, { transaction: t })

        /**
         * UPDATE PRODUCT QUANTITY AFTER ADD TO BILL AND BILL DETAIL SUCCUSS => [BULKUPDATE => BULKCREATE] => TRANSACTION 3
         */
        await Product.bulkCreate(stock, { updateOnDuplicate: ["quantity"], transaction: t })

        res.status(Code.Ok).json(Results.Success(Message.Ok, billDetail));
      });
    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}));
    }
  }
}
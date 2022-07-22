
import { Request, Response } from 'express'
import Bill from '../models/bill.model';
import BillDetail from '../models/bill.detail.model';
import CustomDate from '../services/date';
import { sequelize } from '../database';
import Results, { Code, Message } from '../services/message';
import Product from './../models/product.model';

export default class SaleController {

  public static add = async (req: Request, res: Response): Promise<any> => {

    const { user_id } = req.query
    let itemList: Array<any> = req.body
    //Generate Bill Number
    function generateBillNumber() {
      return +new Date();
    }
    //
    let bill_price: number = 0
    for(let i = 0; i < itemList.length; i++) {
      bill_price += parseInt(itemList[i].price) * parseInt(itemList[i].quantity) 
    }
    //BIll Object
    const billData: object = {
      bill_number: generateBillNumber(),
      bill_date: CustomDate.OnlyDate(),
      bill_time: CustomDate.Onlytime(),
      user_id: user_id,
      bill_price: bill_price
    }
    //New transaction
    const t = await sequelize.transaction();
    try {
      //Add to bill
      const bill: Bill | null = await Bill.create(billData, { transaction: t })
      //Check add bill success
      if (bill === null) {
        res.status(Code.Error).json(Results.Fail("Add bill failed.", {}))
        return;
      }
      //Add item to bill detail data list
      let billDetailData: Array<object> = [];
      for (let i = 0; i < itemList.length; i++) {
        billDetailData.push({
          quantity: itemList[i].quantity,
          bill_dt_date: CustomDate.OnlyDate(),
          bill_dt_time: CustomDate.Onlytime(),
          bill_id: bill.bill_id,
          product_id: itemList[i].product_id
        })
      }
      if(billDetailData.length <= 0) {
        res.status(Code.NoContent).json(Results.Fail("No Item List For Add.", {}))
        return;
      }
      //Add to bill detail
      const billDetail: BillDetail[] = await BillDetail.bulkCreate(billDetailData, { transaction: t })
   
      const stock: Array<any> = [];
      //Filter only product id
      const product_id: Array<any> = [];
      for (let i = 0; i < itemList.length; i++) {
        product_id.push(itemList[i].product_id)
      }
      //Get product list
      const productList: Product[] = await Product.findAll(
        {
          attributes: ["product_id", "quantity"],
          where: { product_id: product_id }
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
      //Update quantity after sale
      for (let i = 0; i < stock.length; i++) {
         await Product.update({quantity: stock[i].quantity}, { where: {product_id: stock[i].product_id}, transaction: t},)
      }
      //Success commit
      t.commit()
      res.status(Code.Ok).json(Results.Success(Message.Ok, billDetail));

    } catch (error: any) {
      t.rollback()
      res.status(Code.Error).json(Results.Fail(error.message, {}))
    }

  }
}
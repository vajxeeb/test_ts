

import { Request, Response } from "express"
import BillDetail from '../models/bill.detail.model';
import { sequelize } from '../database';
import Product from '../models/product.model';
import { Code, Message } from "../services/message-statusCode";
import Results from '../services/message-statusCode';
import Bill from '../models/bill.model';
import User from '../models/user.model';
import { Query } from "../query/queries";
const { QueryTypes } = require("sequelize")
export default class BillController {

    public static cancel = async (req: Request, res: Response) => {

        const { bill_id } = req.query
        /**
         * START TRANSACTION
         */
        const t = await sequelize.transaction();
        try {
             /**
              * GET PRODUCT ID AND QUANTITY FROM BILLDETAIL
              */
            const billdetail: BillDetail[] = await BillDetail.findAll(
                {
                    attributes: ["product_id", "quantity"],
                    where: { bill_id, del: false, cancel: false }, transaction: t
                })
            const billinfo = JSON.parse(JSON.stringify(billdetail))
            /**
             * CHECK DATA OF BILL THAT IT EXIST OR NOT
             */
            if (billinfo.length <= 0) {
                res.status(Code.Notfound).json(Results.Fail(Message.Notfound, {}))
                return;
            }
           /**
            * PUSH PRODUCT ID TO PRODUCT ID LIST
            */
            const productId: Array<any> = [];
            for (let i = 0; i < billdetail.length; i++) {
                productId.push(billdetail[i].product_id)
            }
            /**
             * GET PRODUCT ID AND QUANTITY FROM  PRODUCT
             */
            const product: Product[] = await Product.findAll(
                {
                    attributes: ["product_id", "quantity"],
                    where: { product_id: productId, del: false }, transaction: t
                })
            const product2 = JSON.parse(JSON.stringify(product))

            /**
             * UPDATE STOCK OF PRODUCT AFTER CANCEL BILL
             */
            const addstock = []
            for (let j = 0; j < billinfo.length; j++) {
                addstock.push(
                    {
                        product_id: billinfo[j].product_id,
                        quantity: parseInt(product2[j].quantity) + parseInt(billinfo[j].quantity)
                    }
                )
            }
            for (let i = 0; i < addstock.length; i++) {
                await Product.update({ quantity: addstock[i].quantity }, { where: { product_id: addstock[i].product_id }, transaction: t },)
            }
            /**
             * CANCEL
             */
            await BillDetail.update({ cancel: true }, { where: { bill_id }, transaction: t })
            await Bill.update({ cancel: true }, { where: { bill_id }, transaction: t })
            /**
             * SUCCESS THEN COMMIT
             */
            t.commit()
            res.status(Code.Ok).json(Results.Success(Message.Ok, billinfo));

        } catch (error: any) {
           
            t.rollback()
            res.status(Code.Error).json(Results.Fail(error.message, {}))
        }

    }
    public static getbill = async (req: Request, res: Response) => {
        try {
            const { bill_date, bill_number, cancel, page, size } = req.query
            let billCause = {}
            if (bill_number != "" && bill_number != undefined) {
                billCause = { cancel: cancel, bill_date: bill_date, bill_number: bill_number }
            } else {
                billCause = { cancel: cancel, bill_date: bill_date }
            }
            const bills: Bill[] = await Bill.findAll(
                {
                    attributes: ["bill_id", "bill_number", "bill_price", "bill_date", "bill_time"],
                    limit: parseInt(size),
                    offset: parseInt(page),
                    where: billCause,
                }
            )
            res.status(Code.Ok).json(Results.Success(Message.Ok, bills))

        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, {}))
        }

    }
    public static getbilldetail = async (req: Request, res: Response) => {
        try {
            const { bill_id } = req.query

            const bills: Array<object> = await BillDetail.findAll(
                {

                    attributes: ["bill_dt_id", "quantity"],
                    where: { bill_id: bill_id },
                    include: [
                        {
                            model: Product,
                            attributes: ["product_id", "product_name", "price"],
                            required: true,
                        },
                        {
                            model: Bill,
                            attributes: ["bill_id", "bill_number", "bill_date", "bill_time"],
                            required: true,
                            include: [
                                {
                                    model: User,
                                    attributes: ["user_id", "username"],
                                    required: true
                                }
                            ]
                        },
                    ]
                }
            )
            // const bills = await sequelize.query(Query.getbill, {type: QueryTypes.SELECT})

            res.status(Code.Ok).json(Results.Success(Message.Ok, bills))
        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, {}))
        }
    }


}

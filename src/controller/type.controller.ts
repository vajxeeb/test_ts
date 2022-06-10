
import { Request, Response } from "express"
import { message, statusCode } from "../services/message"
import  Type from "../models/type.model"

export class TypeController {
    public static add = async (req: Request, res: Response) => {
        try {
            const type = await Type.create({ ...req.body })
            res.status(statusCode.Ok).json({ message: message.Ok, data: type })

        } catch (error: any) {
            res.status(statusCode.ServerError).json({
                message: error.message
            })
        }
    }
    public static findAll = async (req: Request, res: Response) => {
        try {
            const types: Type[] = await Type.findAll({where: {del: false}})
            res.status(statusCode.Ok).json({ message: message.Ok, data: types })
        } catch (error: any) {
            res.status(statusCode.ServerError).json({
                message: error.message
            })
        }
    }
    public static delete = async (req: Request, res: Response) => {

        try {
            const { id } = req.query

            const deleteType: Type | null = await Type.findByPk(id)
            await Type.update({ del: true }, { where: { id } })

            if (deleteType == null) {
                res.status(statusCode.Notfound).json({ message: message.Notfound })
                return;
            }
            res.status(statusCode.Ok).json({
                message: message.Ok,
                data: deleteType
            })

        } catch (error: any) {
            res.status(statusCode.ServerError).json({
                message: error.message
            })
        }
    }

    //Update user
    public static update = async (req: Request, res: Response) => {

        try {
            const { id } = req.body
            await Type.update({ ...req.body }, { where: { id } })
            const updateType: Type | null = await Type.findByPk(id)
            if (updateType === null) {
                res.status(statusCode.Notfound).send({
                    message: message.Notfound + id,
                })
                return;
            }
            res.status(statusCode.Ok).json({
                message: message.Ok,
                data: updateType
            })
        } catch (error: any) {
            res.status(statusCode.ServerError).json({
                message: error.message
            })
        }
    }
}


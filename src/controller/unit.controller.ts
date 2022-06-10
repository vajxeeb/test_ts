
import { Request, Response } from "express"
import { message, statusCode } from "../services/message"
import  Unit from "../models/unit.model"

export class RoleController {
    
    public static add = async (req: Request, res: Response) => {
        try {
            const unit = await Unit.create({ ...req.query })
            res.status(statusCode.Ok).json({ message: message.Ok, data: unit })

        } catch (error: any) {
            res.status(statusCode.ServerError).json({
                message: error.message
            })
        }
    }
    public static findAll = async (req: Request, res: Response) => {
        try {
            const units: Unit[] = await Unit.findAll({where: {del: false}})
            res.status(statusCode.Ok).json({ message: message.Ok, data: units })
        } catch (error: any) {
            res.status(statusCode.ServerError).json({
                message: error.message
            })
        }
    }
    public static delete = async (req: Request, res: Response) => {

        try {
            const { id } = req.query

            const deleteUnit: Unit | null = await Unit.findByPk(id)
            await Unit.update({ del: true }, { where: { id } })

            if (deleteUnit == null) {
                res.status(statusCode.Notfound).json({ message: message.Notfound })
                return;
            }
            res.status(statusCode.Ok).json({
                message: message.Ok,
                data: deleteUnit
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
            await Unit.update({ ...req.body }, { where: { id } })
            const updateUnit: Unit | null = await Unit.findByPk(id)
            if (updateUnit === null) {
                res.status(statusCode.Notfound).send({
                    message: message.Notfound + id,
                })
                return;
            }
            res.status(statusCode.Ok).json({
                message: message.Ok,
                data: updateUnit
            })
        } catch (error: any) {
            res.status(statusCode.ServerError).json({
                message: error.message
            })
        }
    }
}



import { Request, Response } from "express"
import { Message, Code } from "../services/message-statusCode"
import Unit from "../models/unit.model"
import Results from "../services/message-statusCode"

export default class UnitController {

    public static add = async (req: Request, res: Response) => {
        try {
            const unit = await Unit.create({ ...req.body })
            res.status(Code.Ok).json(Results.Success(Message.Ok, unit))

        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, {}))

        }
    }
    public static getAll = async (req: Request, res: Response) => {
        try {
            const units: Unit[] = await Unit.findAll({ where: { del: false } })
            res.status(Code.Ok).json(Results.Success(Message.Ok, units))
        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, {}))

        }
    }
    public static delete = async (req: Request, res: Response) => {

        try {
            const { unit_id } = req.query

            const deleteUnit: Unit | null = await Unit.findByPk(unit_id)
            await Unit.update({ del: true }, { where: { unit_id } })

            if (deleteUnit == null) {
                res.status(Code.Ok).json(Results.Fail(Message.Notfound, {}))
                return;
            }
            res.status(Code.Ok).json(Results.Success(Message.Ok, deleteUnit))


        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, {}))

        }
    }
    public static update = async (req: Request, res: Response) => {

        try {
            const { unit_id } = req.body
            await Unit.update({ ...req.body }, { where: { unit_id } })
            const updateUnit: Unit | null = await Unit.findByPk(unit_id)
            if (updateUnit === null) {
                res.status(Code.Notfound).json(Results.Fail(Message.Notfound, {}))
                return;
            }
            res.status(Code.Ok).json(Results.Success(Message.Ok, updateUnit))

        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, {}))

        }
    }
}


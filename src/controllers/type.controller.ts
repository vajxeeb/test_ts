
import { Request, Response } from "express"
import { Message, Code } from "../services/message-statusCode"
import Type from "../models/type.model"
import Results from '../services/message-statusCode';

export default class TypeController {
    public static add = async (req: Request, res: Response) => {
        try {
            const type = await Type.create({ ...req.body })
            res.status(Code.Ok).json(Results.Success(Message.Ok, type))

        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, {}))
        }
    }
    public static getAll = async (req: Request, res: Response) => {
        try {
            const types: Type[] = await Type.findAll({ where: { del: false } })
            res.status(Code.Ok).json(Results.Success(Message.Ok, types))
        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, {}))
        }
    }
    public static delete = async (req: Request, res: Response) => {

        try {
            const { type_id } = req.query

            const deleteType: Type | null = await Type.findByPk(type_id)
            await Type.update({ del: true }, { where: { type_id } })

            if (deleteType == null) {
                res.status(Code.Ok).json(Results.Fail(Message.Notfound, {}))
                return;
            }
            res.status(Code.Ok).json(Results.Success(Message.Ok, deleteType))

        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, {}))
        }
    }

    public static update = async (req: Request, res: Response) => {

        try {
            const { type_id } = req.body
            await Type.update({ ...req.body }, { where: { type_id } })
            const updateType: Type | null = await Type.findByPk(type_id)
            if (updateType === null) {
                res.status(Code.Ok).json(Results.Fail(Message.Notfound, {}))
                return;
            }
            res.status(Code.Ok).json(Results.Success(Message.Ok, updateType))

        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, {}))
        }
    }
}


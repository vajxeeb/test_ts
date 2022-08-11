
import { Request, Response } from "express"
import { Message, Code } from "../services/message-statusCode"
import Results from '../services/message-statusCode';
import MenuType from '../models/menuType.model';

export default class MenuTypeController {
    public static add = async (req: Request, res: Response) => {
        try {

            const menuTypeData = { mnt_name: req.body.mnt_name }
            const menuType = await MenuType.create(menuTypeData)
            res.status(Code.Ok).json(Results.Success(Message.Created, [menuType]))

        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, []))
        }
    }
    public static getAll = async (req: Request, res: Response) => {
        try {
            const menuTypes: MenuType[] = await MenuType.findAll({ where: { del: false } })
            res.status(Code.Ok).json(Results.Success(Message.Ok, menuTypes))
        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, []))
        }
    }
    public static delete = async (req: Request, res: Response) => {

        try {
            const { mnt_id } = req.query

            const deleteMenuType: MenuType | null = await MenuType.findByPk(mnt_id)
            await MenuType.update({ del: true }, { where: { mnt_id } })

            if (deleteMenuType == null) {
                res.status(Code.Ok).json(Results.Fail(Message.Notfound, []))
                return;
            }
            res.status(Code.Ok).json(Results.Success(Message.Deleted, [deleteMenuType]))

        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, []))
        }
    }

    public static update = async (req: Request, res: Response) => {
        try {
            const { mnt_id } = req.body
            await MenuType.update({ ...req.body }, { where: { mnt_id } })
            const updateMenuType: MenuType | null = await MenuType.findByPk(mnt_id)
            if (updateMenuType === null) {
                res.status(Code.Ok).json(Results.Fail(Message.Notfound, []))
                return;
            }
            res.status(Code.Ok).json(Results.Success(Message.Updated, [updateMenuType]))

        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, []))
        }
    }
}


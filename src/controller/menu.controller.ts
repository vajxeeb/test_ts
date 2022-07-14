
import { Request, Response } from "express"
import { Message, Code } from "../services/message"
import Results from './../services/message';
import Menu from './../models/menu.model.';

export default class MenuController {
    public static add = async (req: Request, res: Response) => {
        try {
            const menu = await Menu.create({ ...req.body })
            res.status(Code.Ok).json(Results.Success(Message.Created, [menu]))

        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, []))
        }
    }
    public static getAll = async (req: Request, res: Response) => {
        try {
            const menus: Menu[] = await Menu.findAll({ where: { del: false } })
            res.status(Code.Ok).json(Results.Success(Message.Ok, menus))
        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, []))
        }
    }
    public static delete = async (req: Request, res: Response) => {

        try {
            const { menu_id } = req.query

            const deleteMenu: Menu | null = await Menu.findByPk(menu_id)
            await Menu.update({ del: true }, { where: { menu_id } })

            if (deleteMenu == null) {
                res.status(Code.Notfound).json(Results.Fail(Message.Notfound, []))
                return;
            }
            res.status(Code.Ok).json(Results.Success(Message.Deleted, [deleteMenu]))

        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, []))
        }
    }

    public static update = async (req: Request, res: Response) => {

        try {
            const { menu_id } = req.body
            await Menu.update({ ...req.body }, { where: { menu_id } })
            const updateMenu: Menu | null = await Menu.findByPk(menu_id)
            if (updateMenu === null) {
                res.status(Code.Ok).json(Results.Fail(Message.Notfound, []))
                return;
            }
            res.status(Code.Ok).json(Results.Success(Message.Updated, [updateMenu]))
        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, []))
        }
    }

    
}


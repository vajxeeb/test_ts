
import { Request, Response } from "express"
import { Message, Code } from "../services/message"
import Results from './../services/message';
import Menu from './../models/menu.model.';
import LogRQS from "../services/logRQS";
const LOGGER = require('../config/logger')

const logger = LOGGER.getLogger();

export default class MenuController {

    public static add = async (req: Request, res: Response) => {
        try {
            let info = {
                menu_name: req.body.menu_name,
                menu_price: req.body.menu_price,
                menu_image: req.file?.path,
                mnt_id: req.body.mnt_id
            }
            /*LOG REQUEST*/ LogRQS.LogReq(req.method, req.originalUrl, info)

            const menu = await Menu.create(info)
            res.status(Code.Ok).json(Results.getResponse(Message.Created, Code.Ok, menu))

             /*LOG RESPONSE*/ LogRQS.LogRes(Message.Created,Code.Ok, menu)
        } catch (error: any) {
            /*LOG ERROR*/logger.error(error.message)
            res.status(Code.Error).json(Results.getResponse(error.message,Code.Error, []))
        }
    }


    public static getAll = async (req: Request, res: Response) => {
        try {
            /*LOG REQUEST*/ LogRQS.LogReq(req.method, req.originalUrl, {})

            const menus: Menu[] = await Menu.findAll({ where: { del: false } })
            res.status(Code.Ok).json(Results.getResponse(Message.Ok, Code.Ok, menus))

           /*LOG RESPONSE*/ LogRQS.LogRes(Message.Ok, Code.Ok, menus)
        } catch (error: any) {

            /*LOG ERROR*/logger.error(error.message)
            res.status(Code.Error).json(Results.getResponse(error.message, Code.Error, []))
        }
    }
    public static delete = async (req: Request, res: Response) => {

        try {
            const { menu_id } = req.query

            /*LOG REQUEST*/ LogRQS.LogReq(req.method, req.originalUrl, {menu_id})

            const deleteMenu: Menu | null = await Menu.findByPk(menu_id)
            await Menu.update({ del: true }, { where: { menu_id } })

            if (deleteMenu == null) {
                res.status(Code.Notfound).json(Results.getResponse(Message.Notfound, Code.Ok, []))
                /*LOG WARNING*/logger.warn("Notfouned menu id for delete.")
                return;
            }
            res.status(Code.Ok).json(Results.getResponse(Message.Deleted, Code.Ok, deleteMenu))
           /*LOG RESPONSE*/ LogRQS.LogRes(Message.Deleted, Code.Ok, deleteMenu)
        } catch (error: any) {
             /*LOG ERROR*/logger.error(error.message)
             res.status(Code.Error).json(Results.getResponse(error.message,Code.Error, []))
            }
    }

    public static update = async (req: Request, res: Response) => {

        try {
            const { menu_id } = req.body

            /*LOG REQUEST*/ LogRQS.LogReq(req.method, req.originalUrl, req.body)

            await Menu.update({ ...req.body }, { where: { menu_id } })
            const updateMenu: Menu | null = await Menu.findByPk(menu_id)
            if (updateMenu === null) {
                res.status(Code.Ok).json(Results.getResponse(Message.Notfound, Code.Ok, []))
               /*LOG WARNING*/logger.warn("Notfouned menu id for update.")

                return;
            }
            res.status(Code.Ok).json(Results.getResponse(Message.Updated,Code.Ok, updateMenu))
             /*LOG RESPONSE*/ LogRQS.LogRes(Message.Updated,Code.Ok, updateMenu)
        } catch (error: any) {
             /*LOG ERROR*/logger.error(error.message)
             res.status(Code.Error).json(Results.getResponse(error.message,Code.Error, []))
            }
    }


}


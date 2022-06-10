
import { Request, Response } from "express"
import { message, statusCode } from "../services/message"
import Role from "../models/role.model"

export class RoleController {

    public static add = async (req: Request, res: Response) => {
        try {
            const role = await Role.create({ ...req.query })
            res.status(statusCode.Ok).json({ message: message.Ok, data: role })

        } catch (error: any) {
            res.status(statusCode.ServerError).json({
                message: error.message
            })
        }
    }
    public static findAll = async (req: Request, res: Response) => {
        try {
            const roles: Role[] = await Role.findAll({ where: { del: false } })
            res.status(statusCode.Ok).json({ message: message.Ok, data: roles })
        } catch (error: any) {
            res.status(statusCode.ServerError).json({
                message: error.message
            })
        }
    }
    public static delete = async (req: Request, res: Response) => {

        try {
            const { id } = req.query

            const deleteRole: Role | null = await Role.findByPk(id)
            await Role.update({ del: true }, { where: { id } })

            if (deleteRole == null) {
                res.status(statusCode.Notfound).json({ message: message.Notfound })
                return;
            }
            res.status(statusCode.Ok).json({
                message: message.Ok,
                data: deleteRole
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
            await Role.update({ ...req.body }, { where: { id } })
            const updateRole: Role | null = await Role.findByPk(id)
            if (updateRole === null) {
                res.status(statusCode.Notfound).send({
                    message: message.Notfound + id,
                })
                return;
            }
            res.status(statusCode.Ok).json({
                message: message.Ok,
                data: updateRole
            })
        } catch (error: any) {
            res.status(statusCode.ServerError).json({
                message: error.message
            })
        }
    }
}


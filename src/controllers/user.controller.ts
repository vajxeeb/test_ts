import { Message, Code } from '../services/message-statusCode';
import { Request, Response } from 'express'
import Role from '../models/role.model'
import User from '../models/user.model'
import Results from '../services/message-statusCode';
import { sequelize } from '../database';
import _Response from '../services/response';

export default class UserController {
    //Add new user
    public static add = async (req: Request, res: Response) => {

        const t = await sequelize.transaction();

        try {

            const data = req.body as User
            const user = await User.findOne({ where: { username: data.username } })

            if (user != null) {
                res.status(Code.ExistData).json(Results.Fail("This username already exist in database. Enter new username", {}))
                return;
            }
            const created: User = await User.create(data);
            res.status(Code.Ok).json(_Response.success(Message.Ok, created))

        } catch (error: any) {
            res.status(Code.Error).json(_Response.fail(error.message, {}))

        }
    }

    //Find all user
    public static getAll = async (req: Request, res: Response) => {
        try {
            const users: User[] = await User.findAll({
                include: [
                    {
                        model: Role,
                        attributes: ['id', 'role_name'],
                        required: true,
                    }
                ],
                where: { del: false }
            })

            res.status(Code.Ok).json(Results.Success(Message.Ok, users))

        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, {}))
        }
    }
    //Delete user by id
    public static delete = async (req: Request, res: Response) => {

        try {
            const { id } = req.query
            const deleted: User | null = await User.findByPk(id)
            await User.update({ del: true }, { where: { id } })
            deleted == null ?
                res.status(Code.Notfound).json(Results.Success(Message.Notfound, {}))
                :
                res.status(Code.Ok).json(Results.Success(Message.Ok, deleted))

        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, {}))

        }
    }

    //Update user
    public static update = async (req: Request, res: Response) => {
        //individualHooks: true 
        try {
            const { user_id } = req.body
            const updated: User | null = await User.findByPk(user_id)
            await User.update({ ...req.body }, { where: { user_id }, individualHooks: true })

            updated == null ?
                res.status(Code.Notfound).json(Results.Success(Message.Notfound, {}))
                :
                res.status(Code.Ok).json(Results.Success(Message.Ok, updated))

        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, {}))
        }
    }
}

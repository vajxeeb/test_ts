import { message, statusCode } from '../services/message';
import { Request, Response } from 'express'
import Role from '../models/role.model'
import User from '../models/user.model'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

export class UserController {
    //Add new user
    public static add = async (req: Request, res: Response) => {
        try {

            const { username, password, role_id } = req.body
            //Check username defore add new user
            const user = await User.findOne({ where: { username } })

            if (user != null) {
                res.status(statusCode.ExistData).json({ message: `${user.username} aleady have enter a new username` })
                return;
            }
            //hash password before add user
            const hashPassword = await bcrypt.hash(password, 10)
            //User body 
            const addUser = {
                username: username,
                password: hashPassword,
                role_id: role_id
            }
            //Add user
            const createUser: User = await User.create(addUser)
            res.status(statusCode.Ok).json({
                message: message.Ok,
                data: createUser
            })
        } catch (error: any) {
            res.status(statusCode.ServerError).json({
                message: error.message
            })
        }
    }
    //Login
    public static login = async (req: Request, res: Response) => {

        try {
            const { username, password } = req.body
            const user = await User.findOne({ where: { username } })
            if (user === null) {
                res.status(statusCode.Notfound).json({ message: message.Notfound + ' user ' + username })
                return;
            }
                if (! await bcrypt.compare(password, user.password)) {
                    const token = await jwt.sign({ user_id: user.id, username },
                        'screkey',
                        {
                            expiresIn: "24h",

                        }
                    )

                    res.status(statusCode.Ok).json({
                        message: message.Ok,
                        access_token: token,
                        data: user
                    })
                    return;
                }

                res.status(statusCode.PasswordIncorrect).json({
                    message: message.PasswordIncorrect
                })

        } catch (error: any) {
            res.status(statusCode.ServerError).json({
                message: error.message
            })
        }

    }
    //Find all user
    public static findAll = async (req: Request, res: Response) => {
        try {
            const users: User[] = await User.findAll({
                include: [
                    {
                        model: Role,
                        attributes: ['id', 'role_name'],
                        required: true
                    }
                ],
                where: { del: false }
            })
            res.status(statusCode.Ok).json({
                message: message.Ok,
                data: users
            })
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }
    //Find all user
    public static findOne = async (req: Request, res: Response) => {
        try {

            const users = await User.findAll({
                include: [
                    {
                        model: Role,
                        attributes: ['id', 'role_name'],
                        required: true
                    }
                ],
                where: { del: false, id: req.query }
            })
            res.status(statusCode.Ok).json({
                message: message.Ok,
                data: users
            })
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }
    //Delete user by id
    public static delete = async (req: Request, res: Response) => {

        try {
            const { id } = req.query

            const deleteUser: User | null = await User.findByPk(id)
            await User.update({ del: true }, { where: { id } })

            if (deleteUser == null) {
                res.status(statusCode.Notfound).json({ message: message.Notfound })
                return;
            }
            res.status(statusCode.Ok).json({
                message: message.Ok,
                data: deleteUser
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
            await User.update({ ...req.body }, { where: { id } })
            const updateUser: User | null = await User.findByPk(id)
            if (updateUser === null) {
                res.status(statusCode.Notfound).send({
                    message: message.Notfound + id,
                })
                return;
            }
            res.status(statusCode.Ok).json({
                message: message.Ok,
                data: updateUser
            })
        } catch (error: any) {
            res.status(statusCode.ServerError).json({
                message: error.message
            })
        }
    }


}

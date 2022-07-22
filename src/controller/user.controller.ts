import { Message, Code } from '../services/message';
import { Request, Response } from 'express'
import Role from '../models/role.model'
import User from '../models/user.model'
import Results from './../services/message';
import { sequelize } from './../database';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
var salt = 10;

export default class UserController {
    //Add new user
    public static add = async (req: Request, res: Response) => {

        const t = await sequelize.transaction();

        try {

            const { username, password, role_id } = req.body
            //Check username defore add new user
            const user = await User.findOne({ where: { username } })

            if (user != null) {
                res.status(Code.ExistData).json(Results.Fail("Already have this user", {}))
                return;
            }
            //hash password before add user
            const hashPassword = await bcrypt.hash(password, salt)
            //User body 
            const addUser = {
                username: username,
                password: hashPassword,
                role_id: role_id,
                individualHooks: true
            }
            //Add user
            const createUser: User = await User.create(addUser, { transaction: t });
            t.afterCommit(() => console.log("Commit success."));
            t.commit();

            res.status(Code.Ok).json(Results.Success(Message.Ok, createUser))

        } catch (error: any) {
            t.rollback();
            res.status(Code.Error).json(Results.Fail(error.message, {}))

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
    //Find all user
    public static getOne = async (req: Request, res: Response) => {
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
            res.status(Code.Ok).json(Results.Success(Message.Ok, users))

        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, {}))

        }
    }
    //Delete user by id
    public static delete = async (req: Request, res: Response) => {

        try {
            const { id } = req.query

            const deleteUser: User | null = await User.findByPk(id)
            await User.update({ del: true }, { where: { id } })

            if (deleteUser == null) {
                res.status(Code.Notfound).json(Results.Success(Message.Notfound, {}))
                return;
            }
            res.status(Code.Ok).json(Results.Success(Message.Ok, deleteUser))


        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, {}))

        }
    }

    //Update user
    public static update = async (req: Request, res: Response) => {
        //individualHooks: true 
        try {
            const { id } = req.body
            await User.update({ ...req.body }, { where: { id }, })
            const updateUser: User | null = await User.findByPk(id)
            if (updateUser === null) {
                res.status(Code.Notfound).json(Results.Success(Message.Notfound, {}))
                return;
            }
            res.status(Code.Ok).json(Results.Success(Message.Ok, updateUser))

        } catch (error: any) {
            res.status(Code.Error).json(Results.Fail(error.message, {}))

        }
    }


}

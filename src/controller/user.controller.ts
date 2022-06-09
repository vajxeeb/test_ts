import { sequlize } from '../database';
import { message, statusCode } from '../services/responese';
import { Request, Response } from 'express'
import Role from '../models/role.model'
import User from '../models/user.model'
const { Sequelize, DataTypes } = require('sequelize');

//Add new user
exports.addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const createUser: User = await User.create({ ...req.body })
        res.status(statusCode.Created).json({
            message: message.Created,
            data: createUser
        })
    } catch (error: any) {
        res.status(statusCode.ServerError).json({
            message: error.message
        })
    }
}
//Find all user
exports.findUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: User[] = await User.findAll({
            attributes: ['first_name', 'last_name', 'email', 'password'],
            include: [
                {
                    model: Role,
                    attributes: ['id', 'role_name'],
                    required: true
                }
            ]
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
exports.deleteUser = async (req: Request, res: Response): Promise<void> => {

    try {
        const { id } = req.params

        const deleteUser: User | null = await User.findByPk(id)
        await User.destroy({ where: { id } })

        if(deleteUser == null) {
            res.status(statusCode.Notfound).json({message: message.Notfound})
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
exports.updateUser = async (req: Request, res: Response): Promise<void> => {

    try {
        const { id } = req.params
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

exports.getUser = async (req: Request, res: Response): Promise<void> => {
    const sql = "SELECT * FROM tbl_user"
try {
    const userList = Sequelize.query(sql)
    console.log(userList)
    res.send(userList)
} catch (error: any) {
    res.status(500).send(error.message)
}
//res.send("hello")
  
}

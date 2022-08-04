
import { Request, Response } from "express"
import User from './../models/user.model';
import Role from './../models/role.model';
import { Message, Code } from "../services/message";
import { sequelize } from "../database";
import { Query } from "../query/queries";
import { QueryTypes } from "sequelize";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: __dirname + '/.env' });
const LOGGER = require('../config/logger')
const logger = LOGGER.getLogger();

export default class Auth {
    public static login = async (req: Request, res: Response) => {
        try {
            logger.info(`${req.method}${req.originalUrl}`, req.body);
            const { username, password } = req.body
            const user: User | null = await User.findOne({
                include: [
                    {
                        model: Role,
                        required: true
                    }
                ],
                where: { username }
            })
            if (user === null) {
                res.status(Code.Notfound).json({
                    message: Message.Notfound,
                    status: false
                })
                logger.warn('Username Notfound')
                return;
            }
            if (await bcrypt.compare(password, user.password)) {
                const token = await jwt.sign({ user_id: user.id, username, role: user.role.role_name },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "24h",
                    }
                )
                const result = {
                    message: Message.Logined,
                    status: Code.Ok,
                    access_token: token,
                    data: user
                }
                res.status(Code.Ok).json(result)

                logger.info(JSON.stringify(result))
                return;
            }
            logger.warn('Password incorrect 🤣')
            res.status(Code.Incorrect).json({
                message: Message.PasswordIncorrect,
                status: false,
            })
        } catch (error: any) {
            logger.error(error.message)
            res.status(Code.Error).json({
                message: error.message,
                status: false,
            })


        }
    }


}

import { Request, Response } from "express"
import User from './../models/user.model';
import Role from './../models/role.model';
import { Message, Code } from "../services/message";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: __dirname + '/.env' });
const logger = require('../config/logger')
const log = logger.getLogger();

export default class Auth {
    public static login = async (req: Request, res: Response) => {
        try {

            log.info(`${req.method}${req.ip}${req.originalUrl}`, req.body);

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
                log.warn('Username Notfound')
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
                    status: true,
                    statusCode: 200,
                    access_token: token,
                    data: user
                }
                res.status(Code.Ok).json(result)
                log.info(JSON.stringify(result))
                return;
            }
            log.warn('Password Incorrect')
            res.status(Code.Incorrect).json({
                message: Message.PasswordIncorrect,
                status: false,
            })
        } catch (error: any) {
            log.error(error.message)
            res.status(Code.Error).json({
                message: error.message,
                status: false,
            })
        }
    }

   
}
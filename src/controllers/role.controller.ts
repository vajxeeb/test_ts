import { Request, Response } from "express";
import { Message, Code } from "../services/message-statusCode";
import Role from "../models/role.model";
import Results from '../services/message-statusCode';
import { sequelize } from '../database';
const { Transaction } = require('sequelize');

export default class RoleController {
  public static add = async (req: Request, res: Response) => {

    try {
      const role = await Role.create({...req.body});
      res.status(Code.Ok).json(Results.Success(Message.Ok, role))

    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))
    }
  };

  public static getAll = async (req: Request, res: Response) => {

    //const t = await sequelize.transaction();
    try {
      const roles: Role[] = await Role.findAll({ where: { del: false } });
      res.status(Code.Ok).json(Results.Success(Message.Ok, roles))

    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))

    }
    // await sequelize.transaction({
    //   //isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE
    // }, async (t) => {
    //   try {
    //     const roles: Role[] = await Role.findAll({ where: { del: false }, transaction: t });
    //     res.status(Code.Ok).json(Results.Success(Message.Ok, roles))

    //   } catch (error: any) {
    //     res.status(Code.Error).json(Results.Fail(error.message, {}))

    //   }
    // });
  };

  public static delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      const deleteRole: Role | null = await Role.findByPk(id);
      if (deleteRole == null) {
        res.status(Code.Notfound).json(Results.Fail(Message.Notfound, {}))
        return;
      }
      await Role.update({ del: true }, { where: { id } });
      res.status(Code.Ok).json(Results.Success(Message.Ok, deleteRole))
    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))
    }
  };

  public static update = async (req: Request, res: Response) => {
    try {

      const { id } = req.body;
      await Role.update({ ...req.body }, { where: { id }, individualHooks: true });
      const updateRole: Role | null = await Role.findByPk(id);
      if (updateRole === null) {
        res.status(Code.Notfound).json(Results.Fail(Message.Notfound, {}))

        return;
      }
      res.status(Code.Ok).json(Results.Success(Message.Ok, updateRole))

    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))
    }

  };
}

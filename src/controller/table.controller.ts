import { Request, Response } from "express";
import { Code, Message } from "../services/message";
import Results from "../services/message";
import Table from './../models/table.model';

export default class TableController {
  public static add = async (req: Request, res: Response) => {
    try {

      const table = await Table.create({...req.body });
      res.status(Code.Ok).json(Results.Success(Message.Ok, table))
    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))
    }
  };
  public static getAll = async (req: Request, res: Response) => {
    try {
      const tables: Table[] = await Table.findAll({

        where: { del: false }
      });
      res.status(Code.Ok).json(Results.Success(Message.Ok, tables));

    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))
    }
  };
  public static getOne = async (req: Request, res: Response) => {
    try {
      const delCause = { del: false };
      const { id } = req.query;
      const table: Table | null = await Table.findOne({
        where: { del: false, id: id },
      });
      if (table === null) {
        res.status(Code.Notfound).json(Results.Fail(Message.Notfound, {}));
        return;
      }
      res.status(Code.Ok).json(Results.Success(Message.Ok, table));
    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))
    }
  };

  public static delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      const deleteTable: Table | null = await Table.findByPk(id);
      await Table.update({ del: true }, { where: { id } });
      if (deleteTable == null) {
        res.status(Code.Notfound).json(Results.Fail(Message.Notfound, {}));
        return;
      }
      res.status(Code.Ok).json(Results.Success(Message.Ok, deleteTable));
    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))
    }
  };

  public static update = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      await Table.update({ ...req.body }, { where: { id } });
      const updateTable: Table | null = await Table.findByPk(id);
      if (updateTable === null) {
        res.status(Code.Notfound).json(Results.Fail(Message.Notfound, {}));
        return;
      }
      res.status(Code.Ok).json(Results.Success(Message.Ok, updateTable));

    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))

    };
  }
  public static getOpenTable = async (req: Request, res: Response) => {
    try {

      const table: Table[] | null = await Table.findAll({
        where: { del: false, open: true },
      });
      res.status(Code.Ok).json(Results.Success(Message.Ok, table));
    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))
    }
  };
  public static getEmptyTable = async (req: Request, res: Response) => {
    try {

      const table: Table[] | null = await Table.findAll({
        where: { del: false,  open: false },
      });

      res.status(Code.Ok).json(Results.Success(Message.Ok, table));
    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))
    }
  };
  public static open = async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      await Table.update({ open: true }, { where: { id } });
      const updateTable: Table | null = await Table.findByPk(id);
      if (updateTable === null) {
        res.status(Code.Notfound).json(Results.Fail(Message.Notfound, {}));
        return;
      }
      res.status(Code.Ok).json(Results.Success(Message.Ok, updateTable));

    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))

    };
  }
  public static close = async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      await Table.update({ open: false }, { where: { id } });
      const updateTable: Table | null = await Table.findByPk(id);
      if (updateTable === null) {
        res.status(Code.Notfound).json(Results.Fail(Message.Notfound, {}));
        return;
      }
      res.status(Code.Ok).json(Results.Success(Message.Ok, updateTable));
    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))

    };
  }
}

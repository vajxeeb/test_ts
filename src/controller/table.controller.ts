import { Request, Response } from "express";
import { Code, Message } from "../services/message";
import Results from "../services/message";
import Table from './../models/table.model';
import { TableStatus } from "../services/constant";
//import { Op, Optional } from '@sequelize/core';
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
export default class TableController {

  public static add = async (req: Request, res: Response) => {
    try {

      const table = await Table.create({ ...req.body });
      res.status(Code.Ok).json(Results.Success(Message.Ok, table))
    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))
    }
  };
  public static getAll = async (req: Request, res: Response) => {
    try {
      const tables: Table[] = await Table.findAll({
        order: [
          ['t_number', 'ASC'],
        ],
        where: { del: false }
      });
      res.status(Code.Ok).json(Results.Success(Message.Ok, tables));

    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))
    }
  };
  public static getSearch = async (req: Request, res: Response) => {
    try {
      const { t_number } = req.query;
      const table:Table[] = await Table.findAll({
        where: { del: false, t_number: {[Op.like]: `%${t_number}%`}},
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
      const { t_id } = req.query;
      const deleteTable: Table | null = await Table.findByPk(t_id);
      await Table.update({ del: true }, { where: { t_id } });
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
      const { t_id } = req.body;
      await Table.update({ ...req.body }, { where: { t_id } });
      const updateTable: Table | null = await Table.findByPk(t_id);
      if (updateTable === null) {
        res.status(Code.Notfound).json(Results.Fail(Message.Notfound, {}));
        return;
      }
      res.status(Code.Ok).json(Results.Success(Message.Ok, updateTable));

    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))

    };
  }
  
  public static open = async (req: Request, res: Response) => {
    try {
      const { t_id } = req.query;
      await Table.update({ t_status: TableStatus.OPEN }, { where: { t_id } });

      const updateTable: Table | null = await Table.findByPk(t_id);
      if (updateTable === null) {
        res.status(Code.Notfound).json(Results.Fail(Message.Notfound, {}));
        return;
      }
      res.status(Code.Ok).json(Results.Success(Message.Ok, [updateTable]));

    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))

    };
  }
  public static close = async (req: Request, res: Response) => {
    try {
      const { t_id } = req.query;
      await Table.update({ t_status: TableStatus.EMPTY }, { where: { t_id } });
      const updateTable: Table | null = await Table.findByPk(t_id);
      if (updateTable === null) {
        res.status(Code.Notfound).json(Results.Fail(Message.Notfound, {}));
        return;
      }
      res.status(Code.Ok).json(Results.Success(Message.Ok, updateTable));
    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))

    };
  }
  public static book = async (req: Request, res: Response) => {
    try {
      const { t_id } = req.query;
      await Table.update({ t_status: TableStatus.BOOK }, { where: { t_id } });
      const updateTable: Table | null = await Table.findByPk(t_id);
      if (updateTable === null) {
        res.status(Code.Notfound).json(Results.Fail(Message.Notfound, {}));
        return;
      }
      res.status(Code.Ok).json(Results.Success(Message.Ok, [updateTable]));
    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))

    };
  }
  public static getFilterTable = async (req: Request, res: Response) => {
    try {
      const { t_status } = req.query
      let filter = {}
      if (t_status == TableStatus.OPEN || t_status == TableStatus.BOOK || t_status == TableStatus.EMPTY) {
        filter = { del: false, t_status: t_status}
      }
      else {
        filter = { del: false }
      }
      console.log(TableStatus.OPEN)
      const table: Table[] = await Table.findAll({
        order: [
          ['t_number', 'asc']
        ],
        where: filter
      });
      res.status(Code.Ok).json(Results.Success(Message.Ok, table));
    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))
    }
  };

}










// public static getOpenTable = async (req: Request, res: Response) => {
  //   try {

  //     const table: Table[] | null = await Table.findAll({
  //       where: { del: false, t_status: TableStatus.OPEN },
  //     });
  //     res.status(Code.Ok).json(Results.Success(Message.Ok, table));
  //   } catch (error: any) {
  //     res.status(Code.Error).json(Results.Fail(error.message, {}))
  //   }
  // };
  // public static getEmptyTable = async (req: Request, res: Response) => {
  //   try {

  //     const table: Table[] | null = await Table.findAll({
  //       where: { del: false, t_status: TableStatus.EMPTY },
  //     });

  //     res.status(Code.Ok).json(Results.Success(Message.Ok, table));
  //   } catch (error: any) {
  //     res.status(Code.Error).json(Results.Fail(error.message, {}))
  //   }
  // };
  // public static getBookTable = async (req: Request, res: Response) => {
  //   try {
  //     const table: Table[] | null = await Table.findAll({
  //       where: { del: false, t_status: TableStatus.BOOK },
  //     });

  //     res.status(Code.Ok).json(Results.Success(Message.Ok, table));
  //   } catch (error: any) {
  //     res.status(Code.Error).json(Results.Fail(error.message, {}))
  //   }
  // };
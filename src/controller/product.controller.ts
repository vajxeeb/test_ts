import { Request, Response } from "express";
import { Code, Message } from "../services/message";
import Product from "../models/product.model";
import Type from "./../models/type.model";
import Unit from "./../models/unit.model";
import Results from "../services/message";

export default class ProductController {
  public static add = async (req: Request, res: Response) => {
    try {
      if (req.body.price < 0 || req.body.quantity < 0) {
        res.status(Code.RequestData).json(Results.Fail("Body request", {}))
        return;
      }
      const unit = await Product.create({ ...req.body });
      res.status(Code.Ok).json(Results.Success(Message.Ok, unit))
    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))
    }
  };
  public static getAll = async (req: Request, res: Response) => {
    try {
      const delCause = { del: false };
      const products: Product[] = await Product.findAll({
        include: [
          {
            model: Type,
            required: true,
            where: delCause,
          },
          {
            model: Unit,
            required: true,
            where: delCause,
          },
        ],
        where: delCause,
      });
      res.status(Code.Ok).json(Results.Success(Message.Ok, products));

    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))
    }
  };
  public static getOne = async (req: Request, res: Response) => {
    try {
      const delCause = { del: false };
      const { id } = req.query;
      const product: Product | null = await Product.findOne({
        include: [
          {
            model: Type,
            required: true,
            where: delCause,
          },
          {
            model: Unit,
            required: true,
            where: delCause,
          },
        ],
        where: { del: false, id: id },
      });
      if (product === null) {
        res.status(Code.Notfound).json(Results.Fail(Message.Notfound, {}));
        return;
      }
      res.status(Code.Ok).json(Results.Success(Message.Ok, product));
    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))
    }
  };
  public static getPage = async (req: Request, res: Response) => {
    try {
      const delCause = { del: false };
      const { page, size } = req.query

      const products: Product[] = await Product.findAll({
        offset: parseInt(page),
        limit: parseInt(size),
        include: [
          {
            model: Type,
            required: true,
            where: delCause,
          },
          {
            model: Unit,
            required: true,
            where: delCause,
          },
        ],
        where: delCause,
      });
      res.status(Code.Ok).json(Results.Success(Message.Ok, products));

    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))
    }
  };
  public static delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      const deleteProduct: Product | null = await Product.findByPk(id);
      await Product.update({ del: true }, { where: { id } });
      if (deleteProduct == null) {
        res.status(Code.Notfound).json(Results.Fail(Message.Notfound, {}));
        return;
      }
      res.status(Code.Ok).json(Results.Success(Message.Ok, deleteProduct));
    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))
    }
  };

  public static update = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      await Product.update({ ...req.body }, { where: { id } });
      const updateProduct: Product | null = await Product.findByPk(id);
      if (updateProduct === null) {
        res.status(Code.Notfound).json(Results.Fail(Message.Notfound, {}));
        return;
      }
      res.status(Code.Ok).json(Results.Success(Message.Ok, updateProduct));

    } catch (error: any) {
      res.status(Code.Error).json(Results.Fail(error.message, {}))

    };
  }
}

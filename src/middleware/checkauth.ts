import { Request, Response, NextFunction } from "express";
import { Code } from "../services/message";
const jwt = require("jsonwebtoken");
require("dotenv").config();

export default class CheckAuth {
  public static auth = (req: Request, res: Response, next: NextFunction) => {
    try {
      let token = req.headers.authorization?.split(" ")[1];
      jwt.verify(token, process.env.JWT_KEY);
      next();
    } catch (err: any) {
      return res.status(Code.AuthFailed).json({
        message: err.message,
        status: false
      });
    }
  };
}

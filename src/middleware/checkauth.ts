import { Request, Response, NextFunction } from "express";
import { Code } from "../services/message";
const jwt = require("jsonwebtoken");
require("dotenv").config();

export default class CheckAuth {

  public static authWithToken = (req: Request, res: Response, next: NextFunction) => {
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

  public static authWithApiKey = (req: Request, res: Response, next: NextFunction) => {
    try {
      let APIKEY = process.env.APIKEY ? process.env.APIKEY : "";
      let message = "";
      if (!req.query.apikey) message = "Api Key Required."
      else message = "Api Key Incorrect."
      if (req.query.apikey == APIKEY) {
        next();
      }
      else {
        res.status(Code.ApiKeyRequire).json({
          message: message,
          status: false
        });
      }
    } catch (err: any) {
      return res.status(Code.ApiKeyRequire).json({
        message: err.message,
        status: false
      });
    }
  }

}

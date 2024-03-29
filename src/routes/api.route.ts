const express = require("express");
const router = express.Router();
import UserController from "../controllers/user.controller";
import ProductController from "../controllers/product.controller";
import RoleController from "../controllers/role.controller";
import TypeController from "../controllers/type.controller";
import UnitController from "../controllers/unit.controller";
import Auth from "../middleware/auth";
import CheckAuth from "../middleware/checkauth";
import Table from '../controllers/table.controller'
import BillController from '../controllers/bill.controller';
import MenuController from "../controllers/menu.controller";
import MenuTypeController from "../controllers/menuType.controller";
import SaleController from '../controllers/sale.controller';
import {
  TypePath,
  UnitPath,
  UserPath,
  ProductPath,
  RolePath,
  AuthPath,
  TablePath,
  BillPath,
  MenuPath,
  MenuTypePath,
  SalePath
} from "../services/paths";

// const file = require('../config/file') 
//import upload from '../config/uploadfile'
//============== Auth =========================
router.post(AuthPath.login, Auth.login);
//============== User =========================
router.post(UserPath.add, UserController.add);
router.post(UserPath.getAll, UserController.getAll);
router.post(UserPath.update,  UserController.update);
router.post(UserPath.delete,  UserController.delete);
//=============== Unit ========================
router.post(UnitPath.add,  UnitController.add);
router.post(UnitPath.getAll, UnitController.getAll);
router.post(UnitPath.update, UnitController.update);
router.post(UnitPath.delete, UnitController.delete);
//============== Role =========================
router.post(RolePath.add, RoleController.add);
router.post(RolePath.getAll, RoleController.getAll);
router.post(RolePath.update, RoleController.update);
router.post(RolePath.delete, RoleController.delete);
//============== Type =========================
router.post(TypePath.add, TypeController.add);
router.post(TypePath.getAll, TypeController.getAll);
router.post(TypePath.update, TypeController.update);
router.post(TypePath.delete, TypeController.delete);
//============== Product ======================
router.post(ProductPath.add,  ProductController.add);
router.post(ProductPath.getAll, ProductController.getAll);
router.post(ProductPath.getOne,  ProductController.getOne);
router.post(ProductPath.getPage, ProductController.getPage);
router.post(ProductPath.update,  ProductController.update);
router.post(ProductPath.delete,  ProductController.delete);
//================Table=========================
router.post(TablePath.add, Table.add);
router.post(TablePath.getAll, Table.getAll);
router.post(TablePath.getSearch, Table.getSearch);
router.post(TablePath.getFilter, Table.getFilterTable);
router.post(TablePath.Book, Table.book);
router.post(TablePath.update, Table.update);
router.post(TablePath.delete, Table.delete);
router.post(TablePath.Open, Table.open);
router.post(TablePath.Close, Table.close);
//================Menu========================
//router.post(MenuPath.add, upload.single('menu_image'), MenuController.add);
router.post(MenuPath.getAll, MenuController.getAll);
router.post(MenuPath.update, MenuController.update);
router.post(MenuPath.delete, MenuController.delete);
//===============MenuType=====================
router.post(MenuTypePath.add, MenuTypeController.add);
router.post(MenuTypePath.getAll, MenuTypeController.getAll);
router.post(MenuTypePath.update, MenuTypeController.update);
router.post(MenuTypePath.delete, MenuTypeController.delete);
//===============sale========================
router.post(SalePath.add, SaleController.add);
//===============bill========================
router.post(BillPath.cancel, BillController.cancel);
router.post(BillPath.getbill, BillController.getbill);
router.post(BillPath.getbilldetail, BillController.getbilldetail);

module.exports = router;

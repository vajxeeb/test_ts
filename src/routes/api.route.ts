const express = require("express");
const router = express.Router();
import UserController from "../controller/user.controller";
import ProductController from "../controller/product.controller";
import RoleController from "../controller/role.controller";
import TypeController from "../controller/type.controller";
import UnitController from "../controller/unit.controller";
import Auth from "../middleware/auth";
import CheckAuth from "../middleware/checkauth";
import Table from '../controller/table.controller'
import BillController from './../controller/bill.controller';

import {
  TypePath,
  UnitPath,
  UserPath,
  ProductPath,
  RolePath,
  AuthPath,
  TablePath,
  BillPath
} from "../services/path";

//<============== Auth =========================>
router.post(AuthPath.login, Auth.login);
//<============== User =========================>
router.post(UserPath.add, UserController.add);
router.post(UserPath.getAll, CheckAuth.auth, UserController.getAll);
router.post(UserPath.getOne, CheckAuth.auth, UserController.getOne);
router.post(UserPath.update, CheckAuth.auth, UserController.update);
router.post(UserPath.delete, CheckAuth.auth, UserController.delete);
//<=============== Unit ========================>
router.post(UnitPath.add,  UnitController.add);
router.post(UnitPath.getAll, UnitController.getAll);
router.post(UnitPath.update, UnitController.update);
router.post(UnitPath.delete, UnitController.delete);
//<============== Role =========================>
router.post(RolePath.add, RoleController.add);
router.post(RolePath.getAll, CheckAuth.auth, RoleController.getAll);
router.post(RolePath.update, CheckAuth.auth, RoleController.update);
router.post(RolePath.delete, CheckAuth.auth, RoleController.delete);
//<============== Type =========================>
router.post(TypePath.add, TypeController.add);
router.post(TypePath.getAll, TypeController.getAll);
router.post(TypePath.update, TypeController.update);
router.post(TypePath.delete, TypeController.delete);
//<============== Product ======================>
router.post(ProductPath.add, CheckAuth.auth, ProductController.add);
router.post(ProductPath.getAll, ProductController.getAll);
router.post(ProductPath.getOne, CheckAuth.auth, ProductController.getOne);
router.post(ProductPath.getPage, ProductController.getPage);
router.post(ProductPath.update, CheckAuth.auth, ProductController.update);
router.post(ProductPath.delete, CheckAuth.auth, ProductController.delete);

//<============== Table ======================>
router.post(TablePath.add, Table.add);
router.post(TablePath.getAll, Table.getAll);
router.post(TablePath.getSearch, Table.getSearch);
router.post(TablePath.getFilter, Table.getFilterTable);
// router.post(TablePath.getEmpty, Table.getEmptyTable);
router.post(TablePath.Book, Table.book);
router.post(TablePath.update, Table.update);
router.post(TablePath.delete, Table.delete);
router.post(TablePath.Open, Table.open);
router.post(TablePath.Close, Table.close);

//=================bill========================
router.post(BillPath.bill, BillController.getbill);

module.exports = router;

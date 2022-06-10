const express = require('express')
const router = express.Router()
import { UserController } from '../controller/user.controller';
import { UserPath } from '../services/path';


router.post(UserPath.add, UserController.add)
router.post(UserPath.login, UserController.login)
router.get(UserPath.findAll, UserController.findAll)
router.get(UserPath.findOne, UserController.findOne)
router.put(UserPath.update, UserController.update)
router.delete(UserPath.delete, UserController.delete)

module.exports = router
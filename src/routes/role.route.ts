import { RoleController } from './../controller/role.controller';
const express = require('express')
const router = express.Router()
import { RolePath } from '../services/path';

router.post(RolePath.add, RoleController.add)
router.get(RolePath.findAll, RoleController.findAll)
router.put(RolePath.update, RoleController.update)
router.delete(RolePath.delete, RoleController.delete)

module.exports = router
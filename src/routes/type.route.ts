import { TypeController } from './../controller/type.controller';
const express = require('express')
const router = express.Router()
import { TypePath } from '../services/path';


router.post(TypePath.add, TypeController.add)
router.get(TypePath.findAll, TypeController.findAll)
router.put(TypePath.update, TypeController.update)
router.delete(TypePath.delete, TypeController.delete)

module.exports = router
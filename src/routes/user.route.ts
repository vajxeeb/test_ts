const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')


router.get('/findUser', userController.getUser)

router.delete('/user/:id', userController.deleteUser)

router.post('/adduser', userController.addUser)

router.delete('/user/:id', userController.deleteUser)

module.exports = router
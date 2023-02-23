const express = require('express')
const userController = require('../controller/users.controller')
const asyncWrap = require('express-async-wrapper');
const validator = require('express-joi-validation').createValidator({})
const validation = require('../dtos/users.dto')
const authorization = require('../../auth/authMiddleware')
const router = express.Router()

router.post('/register-user', validator.body(validation.createUserValidator), asyncWrap(userController.createUser))
router.post('/login-user', validator.body(validation.loginUserValidator), asyncWrap(userController.login))
router.get('/get-users', authorization, asyncWrap(userController.getUsers))
router.get('/get-user/:userId', authorization, asyncWrap(userController.getUserById))
router.delete('/delete-user/:userId', authorization, asyncWrap(userController.deleteUser))
router.put('/update-user/:userId', authorization,validator.body(validation.updateUserValidator) ,asyncWrap(userController.updateUser))

module.exports = router
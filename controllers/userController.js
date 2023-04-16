const router = require('express').Router()
const userModel = require('../models/userModel')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register', userModel.registerUser)
router.post('/login', userModel.loginUser)

router.get('/register', userModel.getAllUsers)

router.get('/orders', authMiddleware, userModel.getOrders)
router.post('/orders', authMiddleware, userModel.createOrder)


module.exports = router
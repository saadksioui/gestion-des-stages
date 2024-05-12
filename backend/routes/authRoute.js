const express = require('express')
const { SignUp, Login } = require('../controllers/userController')


const router = express.Router()

router.post('/signup', SignUp)
router.post('/login', Login)

module.exports = router
const express = require('express')
const { SignUp, Login,getUserById } = require('../controllers/userController')


const router = express.Router()

router.post('/signup', SignUp)
router.post('/login', Login)
router.get('/findById/:id', getUserById)

module.exports = router
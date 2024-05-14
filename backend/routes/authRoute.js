const express = require('express')
const authController = require('../controllers/userController')


const router = express.Router()

router.post('/signup', authController.SignUp)
router.post('/login', authController.Login)
router.get('/findById/:id', authController.getUserById)
router.post('/update/:id', authController.upload, authController.updateUser);


module.exports = router
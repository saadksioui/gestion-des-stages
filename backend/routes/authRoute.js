const express = require('express')
const authController = require('../controllers/userController')


const router = express.Router()

router.post('/signup', authController.SignUp)
router.post('/login', authController.Login)
router.get('/users', authController.getAllUsers)
router.get('/findById/:id', authController.getUserById)
router.put('/update/:id', authController.upload, authController.updateUser);
router.post('/request-password-reset', authController.requestPasswordReset);
router.post('/reset-password', authController.resetPassword);

router.post('/update-password/:id', authController.updatePassword);


module.exports = router
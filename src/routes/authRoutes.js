const express = require('express')
const authControllers = require('../controllers/authControllers')
const {validateUser} = require('../model/user')
const validateMiddleware = require('../middleware/validate')
const {requireAuth} = require('../middleware/authMiddleware')




const router = express.Router()

router.get('/signup', authControllers.signup_get)
router.post('/signup',  authControllers.uploadImg, [validateMiddleware(validateUser)], authControllers.signup_post)
router.get('/login', authControllers.login_get)
router.post('/login', authControllers.login_post)
router.get('/logout', authControllers.logout_get)
router.get('/user/:id', requireAuth, authControllers.getUser)
router.post('/editUser/:id',requireAuth, authControllers.postEditUser)
router.get('/delete/:id', requireAuth, authControllers.deleteUser)

module.exports = router
const express = require('express')
const router = express.Router()
const userController = require('../app/controller/users_controller')
const { body } = require('express-validator');
router.get('/', (req, res)=>{
    res.json({'message':'vehicle'})
})
router.get('/get-user', userController.getUser)
router.post('/login',
    body('email').notEmpty().isEmail(), 
    body('password').notEmpty(), 
userController.login)
router.post('/register', 
    body('email').notEmpty().isEmail(), 
    body('password').notEmpty().isLength({min:6}), 
    body('name').notEmpty().isLength({min:4}), 
    userController.register
)
router.post('/refresh', userController.refresh)

module.exports = router
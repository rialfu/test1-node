const db = require('../models')
const user = db.users
const bcrypt = require("bcrypt")
const dotenv = require('dotenv');
dotenv.config();
const {  validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
async function getUser(req, res){
    
    try{
        const result = await user.findAll()

        res.status(200).json(result)
    }catch(err){
        res.status(500).json({'messsage':'something is wrong'})
    }
}
async function login(req, res){
    try{
        const result = validationResult(req);
        if (result.isEmpty()) {
            const email = req.body['email']
            
            const password =req.body['password']
            const result = await user.findOne({where:{'email':email}})
            if(result == null){
                throw 'error custom'
            }
            const resCompare = bcrypt.compareSync(password, result['pass'])
            if(resCompare == false){
                throw 'error custom1'    
            }
            const options = { expiresIn: '5m' };
            const options2 = { expiresIn: '30m' };
            result['pass'] =''
            const resjwt = jwt.sign({'result':result}, process.env.keypass || "12345", options);
            const resRefresh =jwt.sign({'result':result},  "12346", options2)
            res.status(200).json({'message':'ok', 'token':resjwt, 'refresh':resRefresh})
            return
        }
        res.status(401).json({err:result.array()})
        return
    }catch(err){
        console.log(err)
        res.status(500).json({'message':err})
    }
}
async function refresh(req, res){
    try{
        const token = req.body['refresh']
        if(token ==null){
            return res.status(401).json({'message':'please input refresh token'}) 
        }
        const decoded = jwt.verify(token, process.env.keypass || 12345);
        const options = { expiresIn: '5m' };
        const options2 = { expiresIn: '30m' };
        const resjwt = jwt.sign({'result':decoded.result}, process.env.keypass || 12345, options);
        const resRefresh =jwt.sign({'result':decoded.result}, 123456, options2)
        res.status(200).json({'message':'ok', 'token':resjwt, 'refresh':resRefresh})
    }catch(err){
        res.status(401).json({'message':'expired'})
    }
    req.body['refresh']
}
async function register(req, res){
    try{
        const result = validationResult(req);
        if (result.isEmpty()) {
            const email = req.body['email']
            const name = req.body['name']
            const password =req.body['password']
            const hash = await bcrypt.hash(password, 2)
            user.create({'email':email, 'name':name,'pass':hash})
            console.log(req.body['name'])
            res.status(200).json({'message':'ok', 'pass':hash})
            return
        }
        res.status(401).json({err:result.array()})
        return
    }catch(err){
        res.status(500).json({'message':err})
    }
    
    
}
module.exports={
    getUser,
    login,
    register,
    refresh
}
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });
    try {
        console.log(token)
        const decoded = jwt.verify(token, process.env.keypass || 12345);
        req.auth = decoded.result;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token Invalid' });
    }
};
function is_admin(req, res, next){
    if(req.auth == null || req.auth.is_admin == null){
        return res.status(401).json({'message':'Access Denied, change url'})
    }
    if(req.auth.is_admin == false){
        return res.status(401).json({'message':'Access Denied, change url'})
    }
    next()
    // if(req.auth.is_admin )

}

module.exports = {verifyToken, is_admin};
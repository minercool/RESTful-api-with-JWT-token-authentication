const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req , res, next) =>{
    try {
        const token = req.header("token");
        if(!token){
            return res.status(403).send("Unauthorized access");
        }
        const payload = jwt.verify(token,process.env.jwtSecret);
        req.user = payload.user;
        next();
        
    } catch (error) {
        console.error(error.message);
        return res.status(403).send("Unauthorized access");
    }
}
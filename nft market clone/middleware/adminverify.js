const jwt=require('jsonwebtoken')
module.exports = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,'secret key')
        req.userData = decoded
        if(decoded.password===decoded.password){
        next();}
    }
    catch (error){
        
        return res.status(404).json({
            message : "invalid token"
        });
    }
    
    
}
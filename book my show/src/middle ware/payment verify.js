module.exports = (req,res,next) =>{
    try{
      const  payment="paid"
        if(payment==="paid")
        next();  
        else{
            res.send("payment failed")
        }
    }
    catch (error){
        
        return res.status(404).json(error.message);
    }
    
    
}
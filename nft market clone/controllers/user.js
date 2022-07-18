const express=require('express')
const userschema=require('../models/userschema')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')


//SIGNUP A NEW USER
exports.signup=async(req,res)=>{
const password=req.body.adminpassword
    if(password===12345){
        await bcrypt.hash(req.body.password,10,(error,hash)=>{
         userschema.create({
            name:req.body.name,
            walletaddress:req.body.walletaddress,
            email:req.body.email,
            password:hash,
            role:"admin",
            profilephoto:req.body.profilephoto,
            status:req.body.status
             } )
             .then(result=>{
                console.log(result);
                res.send(result)
            })
            .catch(err=>{console.log(err.message)
            res.send(err.message)})
    })}
    else{
        await userschema.create({
            name:req.body.name,
            walletaddress:req.body.walletaddress,
            email:req.body.email,
            profilephoto:req.body.profilephoto,
            status:req.body.status
             } )
        .then(result=>{
            console.log(result);
            res.send(result)
        })
        .catch(err=>{console.log(err.message)
        res.send(err.message)})}}



  //LOGIN USER AND CREATE TOKEN
    exports.login=async(req,res) => {
       await userschema.findOne({walletaddress: req.body.walletaddress})
       .then(user=>{
        if(user.role==="admin")
      { 
        if(user.length <1){
            return res.status(401).json({
                message : 'Auth failed'

            });
            
        }
        bcrypt.compare(req.body.password,user.password,(err,result) =>{
            
            if(result){
               const token = jwt.sign({
                    walletaddress:user.walletaddress,
                    password: user.password
                },"secret key",
                {
                    expiresIn : "1h"
                });
                return res.status(200).json({
                    message : "Auth Successful",
                    token : token
                })
            }
            res.status(401).json({
                message :'Invalid Password  '
            })

        });   


}
else{
     if(user.length <1){
           return res.status(401).json({
                    message : 'Auth failed'
      
                });
                
            }
        
                    const token = jwt.sign({
                        walletaddress:user.walletaddress
                    },"secret key",
                    {
                        expiresIn : "1h"
                    });
                    
                    return res.status(200).json({
                        message : "Auth Successful",
                        token : token
                    })
      }})
      .catch(errors=>{res.send('not a user')
    console.log('not a user')}
      )
    }
 //update user details
exports.update=async(req,res)=>{
    const id = req.params.id
    await userschema.findOneAndUpdate({_id:id},{$set:req.body} )
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
}
//delete user
exports.delete=async(req,res)=>{
    const id = req.params.id
    await userschema.deleteOne({id:id} )
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})

}
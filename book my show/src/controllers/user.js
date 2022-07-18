const express=require('express')
const app=express();
const nodemailer=require('nodemailer');
const userschema=require('../models/userschema')
app.use(express.json())
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
app.use(express.urlencoded({extended:true}))

//SIGNUP A NEW USER AND SEND OTP
exports.signup=async(req,res)=>{
    var otp=Math.random()
    otp=otp*10000
    otp=parseInt(otp)
  const {email,name,password}=req.body
  await userschema.create({email,name,password,otp})
        .then(result=>{
            console.log(result);
            res.send(result)
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '@gmail.com',
    pass: ''
  }
});

var mailOptions = {
  from: '',
  to:req.body.email,
  subject: 'otp for registration',
  html: `messing sending to host<h1>the otp for${req.body.name} is ${otp}</h1> `
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    res.send('Email sent: ' + info.response);
  }
})
    })
 . catch(err=>{
         res.send(err.message)
     }
  );}
//VERIFY OTP PAGE
  exports.otpverify=async(req,res)=>{
   const otp= await userschema.findOneAndUpdate({email:req.body.email},{$unset:{otp:req.body.otp}})
      if(req.body.otp==otp.otp){
        res.status(201).send('signup success')
      }
      else{
        res.status(500).send("invalid otp")
      }

  }
  //LOGIN USER AND CREATE TOKEN
  exports.login=async(req,res,next) => {
    await userschema.find({email : req.body.email})
    .exec()
    .then(user => {
        if(user.length <1){
            return res.status(401).json({
                message : 'Auth failed'
  
            });
            
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result) =>{
            
            if(result){
               const token = jwt.sign({
                    email:user[0].email,
                    userId : user[0]._id
                },'secret key',
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
    })  
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
  
    });
  
  
  }; 
 
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
    .exec()
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})

}


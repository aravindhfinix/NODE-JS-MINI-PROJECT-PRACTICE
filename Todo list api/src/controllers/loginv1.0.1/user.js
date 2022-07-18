const userSchema=require('../../models/userschema')
const jwt=require('jsonwebtoken');
const userMail=require('../../helpers/mail').userMail

  //LOGIN USER AND CREATE TOKEN
  exports.login=async(req,res,next) => {
    var otp=Math.random()
    otp=otp*10000
    otp=parseInt(otp)

    await userSchema.findOneAndUpdate({email:req.body.email},{$set:{otp:otp}})    //loging in with only email input

    .then(user => {
            if(user)                                                   //if user sending otp to user email
            { 
             userMail(user.email,user.name,otp)
            }
            res.json({message:'mail sent'})
           })  

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err.message
        })
  
    });
  
  
  }; 
 
//OTP VERIFY AND LOGIN

exports.otpLogin=async(req,res)=>{
 
  await userSchema.findOne({email:req.body.email})

  .then(async result=>{
  if(result.otp===req.body.otp)                                    
  {
   await userSchema.findOneAndUpdate({email:req.body.email},{$unset:{otp:req.body.otp}})
    const token = jwt.sign({
    email:result.email
    },process.env.SECRET_KEY,
{
  algorithm : "HS256",
  expiresIn : "1h"
});
return res.status(200).json({
  message : "Auth Successful",
  token : token
})
}
else
{
res.json({message:'wrong otp try again'})
}
})

.catch(err => {
  console.log(err);
  res.status(500).json({
      error : err.message
  })

});

}
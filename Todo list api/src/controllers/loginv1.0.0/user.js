const userSchema=require('../../models/userschema')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const userMail=require('../../helpers/mail').userMail

//SIGNUP A NEW USER AND SEND OTP
exports.signUp=async(req,res)=>{
  var otp=Math.random()
    otp=otp*10000
    otp=parseInt(otp)

      if(req.body.password===req.body.confirmPassword)          //comparing password and confirm password and creating the user
      {
        const name=req.body.name
        const email=req.body.email

          await bcrypt.hash(req.body.password,10,(error,hash)=>{
            
           userSchema.create({
              name:name,
              email:email,
              password:hash,
              confirmPassword:hash,
              otp:otp
               })

      .then(result=>{
               console.log(result);
               res.json({
                 status:'created',
                 user:result
               })
               userMail(email,name,otp)
              })

              .catch(err => {
                console.log(err);
                res.status(500).json({
                    error : err.message
                })
            });
      })
      }
      else
      {
        res.json({message:'password not matched'})
      }

  }
  
  
//VERIFY OTP PAGE
  exports.otpVerify=async(req,res)=>{

    await userSchema.findOne({email:req.body.email})
  
    .then(async results=>{
      if(req.body.otp=results.otp)                 //have to verify the otp to login
      {
      await userSchema.findOneAndUpdate({email:req.body.email},{$unset:{otp:req.body.otp}})
 
        res.status(201).json({message:'signup success'})
      }
      else
      {
        res.status(500).json({message:"invalid otp"})
      }
    })

    .catch(err => {
      console.log(err);
      res.status(500).json({
          error : err.message
      })
  });
  }
  //LOGIN USER AND CREATE TOKEN ONLY AFTER OTP VERIFICATION
  exports.login=async(req,res,next) => {
    
    await userSchema.findOne({email:req.body.email})

    .then(user => {
        if(user.otp===undefined){                      //if the otp is verified user is loggedin
        bcrypt.compare(req.body.password,user.password,(err,result) =>{
            if(result)
            {
               const token = jwt.sign({
                    email:user.email,
                    userId : user._id
                  },process.env.SECRET_KEY,
                  {   
                    algorithm : "HS256",
                    expiresIn : "1h"
                  });
                return res.json({token:`bearer ${token}`})
            }
            res.status(401).json({
                message :'password invalid'
            })
  
        })
      }
        else{                                       //if otp verification is not done
          res.status(401).json({message:'otp verification not done'})
        };   
    })  

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err.message
        })
    }); 
  }; 
 
//update user details
exports.update=async(req,res)=>{
    const id = req.params.id

    await userSchema.findOneAndUpdate({_id:id},{$set:req.body})

    .then(results=>{
      if(!results)
      {
       res.status(404).json({message:'user not found'})
      }
      else
      {
        res.status(200).json({message:'otp verification done'})
      }
})

.catch(err => {
  console.log(err);
  res.status(500).json({
      error : err.message
  })
});
}
//delete user
exports.delete=async(req,res)=>{
    const id = req.params.id

    await userSchema.deleteOne({_id:id} )

    .then(results=>{
      if(!results)
      {
        res.status(404).json({message:'user not found'})
      }
      else
      {
        res.status(200).json({message:'sucessfully deleted'})
      }
    })

    .catch(err => {
      console.log(err);
      res.status(500).json({
          error : err.message
      })
  });
}
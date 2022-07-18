const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true    
    },
    name:{type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    confirmPassword:{
        type:String,
        required:true,
        minlength:6
    },
    otp:{type:Number},
});

const user=mongoose.model('users',userSchema )
module.exports=user
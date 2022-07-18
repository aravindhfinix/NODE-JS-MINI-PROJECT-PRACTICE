const mongoose=require('mongoose')

const userschema=mongoose.Schema({
    name:{type:String,required:true},
    walletaddress:{type:String,required:true},
    email:{  type:String,
        required:true,
        unique:true,
        lowercase:true},
    password:{type:String},
    role:{type:String},
    adminpassword:{type:Number},
    profilephoto:{type:String},
    status:{type:Boolean}
})
const user=mongoose.model('user',userschema)
module.exports=user
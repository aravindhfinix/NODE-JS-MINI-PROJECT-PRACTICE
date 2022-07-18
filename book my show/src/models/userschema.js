const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
        
    },
    name:{type:String},
    password:{
        type:String,
        required:true,
        minlength:6
    },
    otp:{type:Number},
});
 
userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
})
const userschema=mongoose.model('users',userSchema )
module.exports=userschema;

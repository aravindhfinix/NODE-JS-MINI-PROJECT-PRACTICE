const mongoose=require('mongoose')


const theaterschema=mongoose.Schema({
    name:{type:String},
    location:{type:String,Number},
    ac:{type:String},
    movies:[{type:mongoose.Schema.Types.ObjectId,ref:'movies'}]

})

const theater=mongoose.model('theaters',theaterschema)
module.exports=theater



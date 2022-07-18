const mongoose=require('mongoose')

const movieschema=mongoose.Schema({
    name:{type:String,required:true},
    language:{type:String,required:true},
    theaters:{type:mongoose.Schema.Types.ObjectId,ref:'theater'},
    screen:{type:String,Number},

})
const movies=mongoose.model('movies',movieschema)
module.exports=movies
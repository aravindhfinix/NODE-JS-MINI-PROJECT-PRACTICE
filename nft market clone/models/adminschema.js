const mongoose=require('mongoose')

const adminschema=mongoose.Schema({
    name:{type:String,required:true},
    creatorName:{type:String,required:true},
    collectionImage:{type:String},
    status:{type:String,default:"pending"},
    owner:[{type:mongoose.Schema.Types.ObjectId,ref:'collection'}]

})
const admin=mongoose.model('admin',adminschema)
module.exports=admin
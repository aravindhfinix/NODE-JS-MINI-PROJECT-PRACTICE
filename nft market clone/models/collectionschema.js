const mongoose=require('mongoose')

const collectionschema=mongoose.Schema({
    name:{type:String,required:true},
    creatorName:{type:String,required:true},
    collectionImage:{type:String},
    status:{type:Boolean,default:true},
    owner:[{type:mongoose.Schema.Types.ObjectId,ref:'collection'}]

})
const collection=mongoose.model('collection',collectionschema)
module.exports=collection
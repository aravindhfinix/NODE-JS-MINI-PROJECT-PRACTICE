const mongoose=require('mongoose')

const bidschema=mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String},
    nftImage:{type:String},
    nftCollection:[{type:mongoose.Schema.Types.ObjectId,ref:'collection'}],
    status:{type:Boolean},
    price:{type:Number},
    isSold:{type:Boolean,default:false},
    saleType: {
        type: String,
        enum : ['buy','bid'],
        default:'bid'
    },
    startingtime:{type:Date},
    endingtime:{type:Date},
    bidingtime:{type:Date,default:Date.now},
    biders:{type:mongoose.Schema.Types.ObjectId,ref:'users'}
}) 
const bid=mongoose.model('auction',bidschema)
module.exports=bid
const mongoose=require('mongoose')
const theater = require('./theaterschema')


const seatschema=mongoose.Schema({
    seatnumber:{type:Number, required:true},
    status:{type:String, required:true},
    screen:{type:Number},
    time:{type:String,Number},
    movie:{type:mongoose.Schema.Types.ObjectId,ref:'movies'}
})

const seats=mongoose.model('seats',seatschema)
module.exports=seats


const mongoose=require('mongoose')

const todoSchema=mongoose.Schema({
    userName:{type:String,required:true},
    userId:[{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true}],
    taskName:{type:String,required:true},
    taskDetailes:{type:String},
    taskDue:{type:String},
    taskCreatedAt:{type:String},
    taskUpdatedAt:{
       date:{type:String},
       time:{type:String}
    },
    status:{type:Boolean,default:false},
    comment:{type:String}

}) 
const todo=mongoose.model('taskList',todoSchema)
module.exports=todo
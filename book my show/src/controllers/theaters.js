const express=require('express')
const app=express();
const theaterschema=require('../models/theaterschema')
app.use(express.json())
const movies=require('../models/movieschema')
app.use(express.urlencoded({extended:true}))


//SHOW SELECTED OR SEARCHED theater DETAILES
exports.find=async (req,res)=>{
    await theaterschema.findOne({name:req.params.id})
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
};

//ADDING A theater TO THE DATABASE
exports.create=async(req,res)=>{
    await theaterschema.create({
        name:req.body.name,
        location:req.body.location,
        ac:req.body.ac
    })
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
}


//UPDATING THE theater DETAILES
exports.update=async(req,res)=>{
    const id = req.params.id
    const movies1=await movies.find({theaters:req.body.id})
    await theaterschema.findOneAndUpdate({_id:id},{$set:{movies:movies1 }} )
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
}
//POPULATE
exports.findmovies=async(req,res)=>{
await theaterschema.find().populate('movies')
.then(results=>{res.send(results)})
.catch(errors=>{res.send(errors.message)})
}


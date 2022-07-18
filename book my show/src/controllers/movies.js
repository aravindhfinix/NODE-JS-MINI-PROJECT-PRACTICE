const express=require('express')
const app=express();
const movieSchema=require('../models/movieschema');
const theater = require('../models/theaterschema');
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//ADDING A MOVIE TO THE DATABASE
exports.create=async(req,res)=>{
    await movieSchema.create({
        name:req.body.name,
        language:req.body.language,
        theaters:await theater.findOne({name:req.body.theaters}),
        screen:req.body.screen
    })
   .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
}
//UPDATING THE MOVIE DETAILES
exports.update=async(req,res)=>{
    const id = req.params.id
    await movieSchema.findOneAndUpdate({_id:id},{$set:req.body} )
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
}
//DISPLAYS ALLMOVIES
exports.home=async(req,res)=>{
    await movieSchema.find()
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
}

//SHOW SELECTED OR SEARCHED MOVIE DETAILES
exports.find=async(req,res)=>{
    await movieSchema.findOne({name:req.params.id})
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
}
//enter booking tickets
exports.bookmovies=async(req,res)=>{
    await movieSchema.fi
}
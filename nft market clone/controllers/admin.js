const express=require('express')
const collectionschema=require('../models/collectionschema')
const adminschema=require('../models/adminschema');



//collection pending list
exports.pending=async(req,res,next) => {
    await adminschema.find()
    .then(user => {console.log(user),
    res.send(user)})
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
  
    });
  }
//create collection accecpted
exports.accept=async(req,res)=>{
    const data=await adminschema.findOneAndDelete({_id:req.params.id})
    await collectionschema.create({    
name:data.name,
creatorName:data.creatorName,
collectionImage:data.collectionImage,
status:true,
owner:data.owner
    })
    .then(user => {console.log(user),
        res.send('collection accepted')})
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err.message
            })
      
        });
      
}

//delete collection rejected

exports.reject=async(req,res)=>{
await adminschema.findOneAndDelete({_id:req.params.id})

    .then(user => {console.log(user),
        res.send('collection rejected')})
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err.message
            })
      
        });
      
}


        
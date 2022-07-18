const express=require('express')
const app=express();
const collectionschema=require('../models/collectionschema')
const adminschema=require('../models/adminschema')
const userschema=require('../models/userschema')

//create collection
exports.create=async(req,res)=>{
  await adminschema.create({
    name:req.body.name,
    creatorName:req.body.creatorName,
    collectionImage:req.body.collectionImage,
    status:true,
    owner:await userschema.findOne({walletaddress:req.body.owner})
  })
        .then(result=>{
            console.log(result);
            res.send(result)
        })
        .catch(err=>{console.log(err.message)
            res.send(err.message)})}
  //get collection
  exports.get=async(req,res,next) => {
    await collectionschema.find({name:req.body.name})
    .then(user => {console.log(user)})
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
  
    });
  
  
  }
 
//update collection
exports.update=async(req,res)=>{
    const id = req.params.id
    await collectionschema.findOneAndUpdate({_id:id},{$set:req.body} )
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
}
//delete collection
exports.delete=async(req,res)=>{
    const id = req.params.id
    await collectionschema.deleteOne({id:id} )
    .exec()
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})

}
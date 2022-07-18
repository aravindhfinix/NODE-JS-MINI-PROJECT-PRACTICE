const express=require('express')
const app=express();
const nftschema=require('../models/nftschema')
const collectinschema=require('../models/collectionschema')

//create nft
exports.create=async(req,res)=>{
  
  const collection=await collectinschema.findOne({name:req.body.nftCollection})
  console.log(req.file)
  await nftschema.create({
    name:req.body.name,
    description:req.body.description,
    nftImage:req.file.originalname,
    nftCollection:collection,
    status:req.body.status,
    price:req.body.price,
    isSold:req.body.isSold
})
        .then(result=>{
            console.log(result);
            res.send(result)
        })
        .catch(err=>{console.log(err.message)
            res.send(err.message)})}
  //get nfts
  exports.get=async(req,res,next) => {
      const collection=await collectinschema.findById({_id:req.params.id})
    await nftschema.find({nftCollection:collection})
    .then(user => {console.log(user),
    res.send(user)})
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
  
    });
  
  
  }
 
//update nft
exports.update=async(req,res)=>{
    const id = req.params.id
    await nftschema.findOneAndUpdate({_id:id},{$set:req.body} )
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
}
//delete nft
exports.delete=async(req,res)=>{
    const id = req.params.id
    await nftschema.deleteOne({id:id} )
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})

}
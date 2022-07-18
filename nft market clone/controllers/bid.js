const express=require('express')
const nftschema=require('../models/nftschema')
const bidschema=require('../models/bidschema')
const collectionschema=require('../models/collectionschema')
const userschema=require('../models/userschema')
const { reset } = require('nodemon')


exports.auction=async(req,res)=>{
   const data= await nftschema.findOne({_id:req.params.id})
    await bidschema.create(
        {
            name:data.name,
            description:data.description,
            nftImage:data.nftImage,
            nftCollection:data.nftCollection,
            status:true,
            price:req.body.price||data.price,
            startingtime:req.body.startingtime,
            issold:false,
            endingtime:req.body.endingtime
        }
    )
    .then(result=>{
        console.log(result);
        res.send(result)
    })
    .catch(err=>{console.log(err.message)
        res.send(err.message)})

}

exports.bidingtime=async(req,res)=>{
    await bidschema.findByIdAndUpdate(req.params.id,{
        startingtime:req.body.startingtime,
        endingtime:req.body.endingtime
    })
    .then(result=>{
        console.log(result);
        res.send(result)
    })
    .catch(err=>{console.log(err.message)
        res.send(err.message)})
}

exports.biding=async(req,res)=>{
  
const data=await userschema.findById(req.params.id1)
const data1=await bidschema.findByIdAndUpdate(req.params.id,{bidingtime:Date.now()})

if(data1.endingtime<=data1.bidingtime)
{if(data1.isSold===false){res.send('already sold')}
else{
await bidschema.findByIdAndUpdate({_id:req.params.id},{isSold:true})
res.send(`action ended nft sold to ${data.name}`)
}}
else{
if(data1.startingtime<data1.bidingtime){
if(data1.price<req.body.price){
await bidschema.findOneAndUpdate({_id:req.params.id},{$set:{
    biders:data,
    price:req.body.price}})
    .then(result=>{
        console.log(result);
        res.send('bid is made')
    })
    .catch(err=>{console.log(err.message)
        res.send(err.message)})
    }
    else{
        res.send('invalid bid amound')
    }
  
}else{
    res.send('bid has not started')
}
}}

exports.sold=async(req,res)=>{
   const data2=await bidschema.findById({_id:req.params.id})
   const data3=await collectionschema.find({owner:req.params.id1})
    if(data2.isSold===true){ 
        await nftschema.create(
            {
            name:data2.name,
            description:data2.description,
            nftImage:data2.nftImage,
            nftCollection:data3,
            status:true,
            price:data2.price,
            isSold:false
            }
        ) 
        
        .then(result=>{
            console.log(result);
            res.send(result)
        })
        .catch(err=>{console.log(err.message)
            res.send(err.message)})
        }
        else{
            res.send('not sold')
        }
        }
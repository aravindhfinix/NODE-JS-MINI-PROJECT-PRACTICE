const express=require('express')
const app=express();
const seatschema=require('../models/seatschema')
const movieSchema=require('../models/movieschema');
const jwt=require('jsonwebtoken')
app.use(express.json())
const nodemailer=require('nodemailer')
app.use(express.urlencoded({extended:true}))

//creating seats
exports.create=async (req,res)=>{
    await seatschema.create({
        seatnumber:req.body.seatnumber,
        status:req.body.status,
        screen:req.body.screen,
        time:req.body.time,
        movie:await movieSchema.findOne({name:req.body.movie}),
    })
    .then(results=>{res.send(results)
    console.log(results)})
    .catch(errors=>{res.send(errors.message)})
};

//updating the seat status by owner
exports.update=async (req,res)=>{
    await seatschema.findByIdAndUpdate(req.params.id,{$set:{status:req.body.status}})
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
};

//finding the total no of seats
exports.showallseats=async (req,res)=>{
  await seatschema.find({movie:req.params.id},{time:req.body.time})
   
    .then(results=>{res.send(results)})
    .catch(errors=>{res.send(errors.message)})
};
//booking tickets
exports.selectingseats=async(req,res)=>{
   const seat= await seatschema.findById(req.params.id)
   if(seat.status==="free"){
      res.send(seat)
   }
   else{
       res.send("seat not available")
   }
};
//ticket booked
exports.tickets=async(req,res)=>{
    await seatschema.findByIdAndUpdate(req.params.id,{status:"booked"})
  
    .then(async results=>{
      if(results.status=="free"){
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token,'secret key')
      if(results){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: '',
              pass: ''
            }
          });
         const movie=await movieSchema.findById({_id:results.movie})
         console.log(movie)
          var mailOptions = {
            from: '@gmail.com',
            to:decoded.email,
            subject: 'ticket detailed',
            html: `your ticket detailes<br>
           <h1> movie:${movie.name}</h1><br>
           <h3> seat:${results.seatnumber}</h3> <br>
            <h3> time:${results.time}</h3><br>
            <h3> screen:${results.screen}</h3> `
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              res.send(results)
              console.log('Email sent: ' + info.response);
              res.send('Email sent: ' + info.response)
            }
          })}
    }else{
      res.send('seat alredy booked')
    }})
    .catch(errors=>{res.send(errors.message)})

};
//reset all tickets to free an change timings
exports.reset=async(req,res)=>{
    await seatschema.updateMany({status:"free"})
}
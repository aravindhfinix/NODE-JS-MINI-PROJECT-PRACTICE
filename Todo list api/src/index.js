const express=require('express');
const mongoose=require('mongoose')
const app=express();
const userRoutes=require('./routes/userRoutes')
const todoRoutes=require('./routes/todoRoutes')
app.use(express.urlencoded({extended: false}));
app.use(express.json());
require('dotenv').config()


mongoose.connect("mongodb://localhost/todo",()=>{
    const status=mongoose.connection.readyState
    if (status===0){console.log("connection failed to db")}
    if(status===1){console.log("successfully connected to db")}
}) 

//MAIN ROUTES

app.get('/',(req,res)=>{res.send('welcome to To-Do app')})
app.use('/user', userRoutes)
app.use('/todo', todoRoutes)

//404 ERROR IF REQUESTED URL NOT FOUND

app.use((req, res, next) => {
    res.status(404).json({error:"requested page not found"})
});

const port=process.env.PORT||3000
app.listen(port,()=>{console.log(`server running at port ${port}....`)})
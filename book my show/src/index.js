const mongoose=require('mongoose');
const express=require('express');
const app=express();
const userRoutes=require('./routes/userrouts')
const movieRoutes=require('./routes/movieroutes')
const theaterRoutes=require('./routes/theaterroutes')
const seatroutes=require('./routes/seatroutes')
mongoose.connect("mongodb://localhost/booking")


app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('test case')
})
app.use('/user', userRoutes)
app.use('/movie', movieRoutes)
app.use('/theater', theaterRoutes)
app.use('/seats',seatroutes)

app.use((req, res, next) => {
    const error =new Error("not found"); 
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});



const port=process.ENV||4000
app.listen(port,()=>{console.log(`server started ${port}`)})
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const user=require('../models/userschema')
require('dotenv').config()

const opts = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.SECRET_KEY,
    algorithm : "HS256"
    }
    const Strategy=(new JwtStrategy(opts,(payload, done)=> {
     user.findOne({id:payload.sub})
        .then(result=>{
        if(result){
            return done(null,result)}
        else{
            return done(null,false)
        } })
        .catch(err=>{console.log(err.message)
        return done(err)})
    }));

    module.exports=(Passport)=>{
        Passport.use(Strategy)
    }
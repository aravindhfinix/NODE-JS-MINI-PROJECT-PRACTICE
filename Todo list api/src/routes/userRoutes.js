const express=require('express');
const router = express.Router();
const  user1 = require ('../controllers/loginv1.0.0/user')
const  user2 = require ('../controllers/loginv1.0.1/user')


router.post('/signup',user1.signUp)
router.post('/v1.0.0/login',user1.login)
router.post('/v1.0.1/login',user2.login)
router.post('/update/:id',user1.update)
router.post('/delete/:id',user1.delete)
router.patch('/v1.0.0/verify',user1.otpVerify)
router.post('/v1.0.1/verify',user2.otpLogin)

module.exports=router 
const express=require('express');
const router = express.Router();
const  user = require ('../controllers/user')


router.post('/signup',user.signup)
router.post('/login',user.login)
router.post('/update/:id',user.update)
router.post('/delete/:id',user.delete)
router.patch('/verify',user.otpverify)


module.exports=router
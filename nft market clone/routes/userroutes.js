const express=require('express');
const router = express.Router();
const  user = require ('../controllers/user')


router.post('/signup',user.signup)
router.post('/login',user.login)
router.patch('/update/:id',user.update)
router.post('/delete/:id',user.delete)


module.exports=router
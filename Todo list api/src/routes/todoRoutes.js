const express=require('express');
const router= express.Router();
const  todo= require ('../controllers/todo')
const passport=require('passport')
require('../middleware/passport')(passport)


router.post('/create', todo.create)
router.get('/taskList',todo.previous)
router.post('/update/:id',todo.update)
router.post('/delete/:id',todo.delete)
router.post('/comment/:id',passport.authenticate('jwt',{session:false}),todo.comment)
router.post('/mail',todo.mail)

module.exports=router
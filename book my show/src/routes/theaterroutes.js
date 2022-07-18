const express=require('express');
const router= express.Router();
const theater=require('../controllers/theaters')

router.get('/find/:id',theater.find)
router.post('/create',theater.create)
router.put('/update/:id',theater.update)
router.get('/populate',theater.findmovies)

module.exports=router
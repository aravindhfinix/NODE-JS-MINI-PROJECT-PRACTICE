const express=require('express');
const router= express.Router();
const seats=require('../controllers/seats')
const verify=require('../middle ware/veify token')
const payment=require('../middle ware/payment verify')

router.post('/create',seats.create)
router.patch('/update/:id',seats.update)
router.post('/showallseats/:id',seats.showallseats)
router.get('/selectingseats/:id',seats.selectingseats)
router.patch('/booked/:id',verify,payment,seats.tickets)
router.patch('/reset',seats.reset)
module.exports=router

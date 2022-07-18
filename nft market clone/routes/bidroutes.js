const express=require('express');
const router = express.Router();
const verify=require('../middleware/tokenverify')
const bid = require('../controllers/bid');


router.post('/auction/:id',bid.auction)
router.post('/bidingtime/:id',bid.bidingtime)
router.post('/biding/:id/:id1',bid.biding)
router.post('/sold/:id/:id1',bid.sold)
 
module.exports=router
const express=require('express');
const router = express.Router();
const adminverify=require('../middleware/adminverify')
const admin = require('../controllers/admin');


router.post('/accept/:id',adminverify,admin.accept)
router.post('/reject/:id',adminverify,admin.reject)
router.get('/pending',adminverify,admin.pending)


module.exports=router
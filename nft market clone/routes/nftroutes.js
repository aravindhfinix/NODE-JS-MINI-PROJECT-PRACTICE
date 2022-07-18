const express=require('express');
const router = express.Router();
const  nft = require ('../controllers/nft')
const multer=require('multer')
const path = require('path');


const diskstorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
});

const upload = multer({storage:diskstorage});  


router.post('/create',upload.single("nftimage"),nft.create)
router.get('/get/:id',nft.get)
router.patch('/update/:id',nft.update)
router.post('/delete/:id',nft.delete)


module.exports=router
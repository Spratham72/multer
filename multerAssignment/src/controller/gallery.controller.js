const express=require('express');
const fs=require('fs');
const path=require('path');
const Photo=require('../model/gallery.model');
const User = require('../model/user.model');
const upload=require('../utils/profilePhoto')
const router=express.Router();
router.post('/',upload.array("photos",5),async(req,res)=>{
    try {
        const photos=req.files;
        console.log(photos)
        let data = [];

            // iterate over all photos
            photos.map(p => data.push({
                name: p.originalname,
                mimetype: p.mimetype,
                size: p.size
            }));
        const photo=await Photo.create({user:req.body.user,gallery_pic:photos}); 
        res.json({photo})
       }
       catch (error) {
        res.status(500).json(error)
    }
})
router.delete('/:id', async(req,res)=>{
    const gallery=await Photo.findById(req.params.id);
    gallery.gallery_pic.forEach(element => {
       
       fs.rm(`${element[0].path}`,(err)=>{
           if(err){
               console.log(err.message);
               res.send(err.message)
           }
           else{
               console.log("Succesfully Delted")
           }
       })
    });
    
    const photo=await Photo.findById(req.params.id);
    res.send(photo)
})

router.get('/',async(req,res)=>{
    const photo=await Photo.find().lean().exec();
    res.send(photo)
})
module.exports=router;
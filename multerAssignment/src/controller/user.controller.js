const express=require('express');
const fs=require('fs');
const path=require('path');
const User=require('../model/user.model')
const upload=require('../utils/profilePhoto')
const router=express.Router();
router.post('/',upload.single("profile"),async(req,res)=>{
    try {
        const user= await User.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            profile_pic:req.file.path
        })
        res.send(user)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.patch('/:id',upload.single("profile"),async(req,res)=>{
    try {
        const image=await User.findById(req.params.id);
   
        fs.rm(`${image.profile_pic}`,(err) => {
            if (err) {
               
                console.log("failed to delete local image:"+err);
            } else {
                console.log(`${image.profile_pic}`)
                console.log('successfully deleted local image');                                
            }
    })
        const user= await User.findByIdAndUpdate(req.params.id,{
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            profile_pic:req.file.path
        });
        res.send(user)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.delete('/:id',async(req,res)=>{
    try {
        const image=await User.findById(req.params.id);
   
        fs.rm(`${image.profile_pic}`,(err) => {
            if (err) {
               
                console.log("failed to delete local image:"+err);
            } else {
                console.log(`${image.profile_pic}`)
                console.log('successfully deleted local image');                                
            }
    })
        const user= await User.findByIdAndDelete(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/',async(req,res)=>{
    try{
    const user=await User.find().lean().exec();
    res.send(user)
    }
    catch (error){
        res.status(500).json(error)
    }
})
module.exports=router;
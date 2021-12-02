const express=require('express');
const connect=require('./config/db');
const userController=require('./controller/user.controller')
const galleryController=require('./controller/gallery.controller')
const app=express();

app.use(express.json());
app.use('/user', userController)
app.use('/gallery', galleryController)
const start=async()=>{
    await connect();
    app.listen(1234,()=>{
        console.log("Server is live on 1234")
    })
}
module.exports=start;
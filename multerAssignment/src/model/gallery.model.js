const mongoose=require('mongoose');
const gallerySchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId},
    gallery_pic:[{type:Array, required:true}]
},{
versionKey:false
})
const Gallery=mongoose.model("Gallery", gallerySchema);
module.exports=Gallery;
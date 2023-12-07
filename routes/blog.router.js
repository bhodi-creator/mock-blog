const express = require('express');
const { BlogsModel } = require('../model/blog.model');
const { auth } = require('../middleware/auth.middleware');

const blogRouter = express.Router();


blogRouter.use(auth)

blogRouter.get("/", async (req, res) => {
    try {
        const blogs = await BlogsModel.find()
        res.status(200).json(blogs)
    } catch (error) {
        res.status(400).json({err:error.msg })
    }
})

blogRouter.post("/add", async (req, res) => {
    const payload = req.body
    try {
        const blog = new BlogsModel(payload)
        await blog.save()
        res.status(200).json({ msg: "A new blog has been added" })
    } catch (error) {
        res.status(400).json({ error })
    }
})

blogRouter.put("/update/:id",async(req,res)=>{
  try{
    const {
        username,
        title,
        content,
        category,
        date,
        like,
        comments,
    }=req.body
    const id=req.params.id
    const blog=await BlogsModel.findByIdAndUpdate(id,{
        username,
        title,
        content,
        category,
        date,
        like,
        comments,
    },{new:true})
res.status(200).json({"msg":"it is success fully.."})
  }catch(err){
    res.status(200).json({"error":err})
  }
})

blogRouter.delete("/delete/:id", async (req, res) => {
    try {
        const  id  = req.params.id;
        const blog = await BlogsModel.findByIdAndDelete(id);
        res.status(200).json({"msg":"delete success fully...."})
    } catch (error) {
        res.status(400).json({ error });
    }
});


module.exports = {blogRouter}





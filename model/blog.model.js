// model/blog.model.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    username:String,
    title:String,
    content:String,
    category:String,
    date:String,
    like:Number,
    comments:Array

},
{
    versionKey:false

});

const BlogsModel = mongoose.model('Blog', blogSchema);

module.exports = {
    BlogsModel,
};

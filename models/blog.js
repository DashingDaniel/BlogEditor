const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URL = process.env.MONGO_URL;
mongoose.connect(URL);
const blogSchema = new Schema({
    
    title: String,
    description: String,
    date: { type: Date, default: Date.now },
    content: String,
    image: String
});


var Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
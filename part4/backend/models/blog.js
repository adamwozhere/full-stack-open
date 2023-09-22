const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: String,
});

const Blog = new mongoose.model('Blog', blogSchema);

module.exports = Blog;

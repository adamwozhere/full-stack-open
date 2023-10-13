const blogsRouter = require('express').Router();
const middleware = require('../utils/middleware');
const Blog = require('../models/blog.js');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.title || !blog.url) {
    return response.status(400).end();
  }

  if (!blog.likes) {
    blog.likes = 0;
  }

  const user = request.user;
  blog.user = user.id;

  const savedBlog = await blog.save();
  savedBlog.populate('user', { username: 1, name: 1 });

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() === user._id.toString()) {
      await Blog.findOneAndRemove(blog);
      return response.status(204).end();
    }

    response.status(401).json({ error: 'unauthorized user' });
  },
);

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate('user', { username: 1, name: 1 });

  response.json(updatedBlog);
});

module.exports = blogsRouter;

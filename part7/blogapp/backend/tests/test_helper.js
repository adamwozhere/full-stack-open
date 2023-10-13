const Blog = require('../models/blog');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcrypt');

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
];

//non existing id?

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const User = require('../models/user');

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const getValidWebToken = async () => {
  const response = await api
    .post('/api/login')
    .send({ username: 'root', password: 'password' });

  return response.body.token;
};

const getUnauthorizedUserWebToken = async () => {
  const passwordHash = await bcrypt.hash('password', 10);
  const user = new User({ username: 'unauthorizedUser', passwordHash });
  await user.save();

  const response = await api.post('/api/login').send({
    username: 'unauthorizedUser',
    password: 'password',
  });

  return response.body.token;
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  getValidWebToken,
  getUnauthorizedUserWebToken,
};

const mongoose = require('mongoose');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  // ensure all are awaited in sequence by using for-of loop
  // (forEach with async .save() inside will not work as they are not actually a child of beforeEach)
  // (alternatively create an array of promises of blogObjects, then await Promise.all() but this will excecute in parallel)
  // (NOT: I don't think parallel or sequentially matters in this case)
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe('when there are some initial blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('a blog has a unique identifier property named id', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });

  test('a specific blog is returned', async () => {
    const response = await api.get('/api/blogs');
    const titles = response.body.map((r) => r.title);
    expect(titles).toContain('Go To Statement Considered Harmful');
  });
});

describe('adding a new blog', () => {
  test('a valid blog can be added', async () => {
    const blog = {
      title: 'valid blog',
      author: 'unknown',
      url: 'https://example.com',
      likes: 0,
    };

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).toContain('valid blog');
  });

  test('a blog with missing likes property will default to zero', async () => {
    const response = await api.post('/api/blogs').send({
      title: 'missing likes',
      author: 'unknown',
      url: 'https://example.com',
    });

    expect(Number(response.body.likes)).toBe(0);
  });

  test('a blog with missing title returns response 400', async () => {
    await api
      .post('/api/blogs')
      .send({
        author: 'unknown',
        url: 'https://example.com',
      })
      .expect(400);
  });

  test('a blog with missing url returns response 400', async () => {
    await api
      .post('/api/blogs')
      .send({ title: 'no title', author: 'unknown' })
      .expect(400);
  });
});

describe('deleting a blog', () => {
  test('succeeds with status 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('updating a blog', () => {
  test('succeeds with satus 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({
        title: 'updated blog',
        author: 'updated author',
      })
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).toContain('updated blog');
  });
});

// clean up
afterAll(async () => {
  await mongoose.connection.close();
});


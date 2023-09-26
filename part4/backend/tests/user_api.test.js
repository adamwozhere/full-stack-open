const bcrypt = require('bcrypt');
const User = require('../models/user');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const mongoose = require('mongoose');

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('password', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation of a new username succeeds', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'KH',
      name: 'Keiran Hebden',
      password: 'fourtet',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((r) => r.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with status 400 and error message when username is already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'beer',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('expected `username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

// clean up
afterAll(async () => {
  await mongoose.connection.close();
});


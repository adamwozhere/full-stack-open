const express = require('express');
const blogsRouter = require('./controllers/blogs.controller');
const usersRouter = require('./controllers/users.controller');
const loginRouter = require('./controllers/login.controller');
const logoutRouter = require('./controllers/logout.controller');
const authorsRouter = require('./controllers/authors.controller');
const readingListsRouter = require('./controllers/readingLists.controller');
const unknownEndpoint = require('./middleware/unknownEndpoint');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/readinglists', readingListsRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);

app.use(unknownEndpoint);

app.use(errorHandler);

module.exports = app;

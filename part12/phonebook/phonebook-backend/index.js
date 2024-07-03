require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

// mongoose.set('strictQuery', false);
// mongoose.connect(url);

// middleware

// app.use(express.static('dist'));
app.use(express.json());
app.use(cors());
// app.use(requestLogger); ???
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

// routes
app.get('/persons', (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

app.get('/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post('/persons', (request, response, next) => {
  const body = request.body;

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'content missing' });
  }

  Person.find({ name: request.body.name }).then((person) => {
    console.log('found person', person);
    if (person.length > 0) {
      // dont know if I need return here:
      // cannot return early as it's a promise,
      // the person.save() code will run before the promise resolves
      return response.status(400).json({ error: 'Name must be unique' });
    } else {
      // as I cannot return early I have to put this in else,
      // or perhaps could use promise.resolveAll or something?
      const person = new Person({
        name: body.name,
        number: body.number,
      });

      person
        .save()
        .then((savedPerson) => {
          response.json(savedPerson);
        })
        .catch((error) => next(error));
    }
  });
});

app.put('/persons/:id', (request, response, next) => {
  const body = request.body;

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'content missing' });
  }

  const newDetails = { name: request.body.name, number: request.body.number };
  Person.findByIdAndUpdate(request.params.id, newDetails, {
    returnDocument: 'after',
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      if (updatedPerson) {
        response.json(updatedPerson);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `<p>Phonebook has info for ${
        persons.length
      } people</p><p>${new Date().toString()}</p>`
    );
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  console.log('error name', error.name);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

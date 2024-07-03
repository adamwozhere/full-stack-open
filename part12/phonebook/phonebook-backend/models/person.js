const mongoose = require('mongoose');
const { MONGO_URL } = require('../util/config');

mongoose.set('strictQuery', false);

// const url = process.env.MONGODB_URI;

console.log('connecting to', MONGO_URL);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      required: true,
    },
    number: {
      type: String,
      minLength: 8,
      validate: {
        validator: (v) => {
          return /^\d{2,3}-\d+/.test(v);
        },
        message:
          'Phone number must consist of 2 or 3 numbers a dash and remaining numbers',
      },
      required: true,
    },
  },
  // mongoose automatically pluralises the model name e.g. User => Users,
  // and uses that for the collection name.
  // However in case of Person, Person => People,
  // So change collection name to Persons to match api endpoint
  { collection: 'persons' }
);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);

const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('provide password as an argument');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://adamwozhere:${password}@cluster0.igx4jgo.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  console.log('phonebook:');

  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else {
  if (name === undefined || number === undefined) {
    mongoose.connection.close();
    console.log('provide password, and both a name and number as arguments');
    process.exit(1);
  }

  const person = new Person({
    name,
    number,
  });

  person.save().then((result) => {
    console.log(`person: ${result.name} saved`);
    mongoose.connection.close();
  });
}


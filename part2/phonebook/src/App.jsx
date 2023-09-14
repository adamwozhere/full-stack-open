import { useState, useEffect } from 'react';
import './index.css';

import phonebook from './services/phonebook';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);

  const getContacts = () => {
    const contacts = phonebook.getAll();
    contacts
      .then((initialContacts) => setPersons(initialContacts))
      .catch((error) => console.log('fail', error));
  };

  useEffect(getContacts, []);

  const createContact = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name == newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with new one ?`
        )
      ) {
        phonebook
          .update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then((returnedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            )
          );
      }
    } else {
      const personObject = { name: newName, number: newNumber };
      phonebook
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNotificationMessage({
            message: `Added ${returnedPerson.name}`,
            type: 'success',
          });
          setTimeout(() => setNotificationMessage(null), 5000);
        })
        .catch((error) => console.log('fail', error));
    }

    setNewName('');
    setNewNumber('');
  };

  const deleteContact = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      phonebook
        .delete(id)
        .then(setPersons(persons.filter((person) => person.id !== id)))
        .catch((error) => {
          console.log('fail', error);
          setNotificationMessage({
            message: `Information of ${name} has already been removed from server`,
            type: 'error',
          });
          setTimeout(() => setNotificationMessage(null), 5000);
        });
    }
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter filter={filter} onFilterChange={handleFilterChange} />

      <h3>Add new</h3>
      <PersonForm
        onSubmit={createContact}
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} onDelete={deleteContact} />
    </div>
  );
};

export default App;


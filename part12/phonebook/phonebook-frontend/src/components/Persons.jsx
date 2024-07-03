const Person = ({ name, number, id, handleDelete }) => (
  <p>
    {name} {number}{' '}
    <button onClick={() => handleDelete(id, name)}>delete</button>
  </p>
);

const Persons = ({ persons, filter, onDelete }) => {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <Person
            key={person.name}
            name={person.name}
            number={person.number}
            id={person.id}
            handleDelete={onDelete}
          />
        ))}
    </div>
  );
};

export default Persons;


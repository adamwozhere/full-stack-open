const PersonForm = ({
  onSubmit,
  name,
  number,
  onNameChange,
  onNumberChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Name: </label>
        <input id="name" type="text" value={name} onChange={onNameChange} />
      </div>
      <div>
        <label htmlFor="number">Number: </label>
        <input
          id="number"
          type="tel"
          value={number}
          onChange={onNumberChange}
        />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;


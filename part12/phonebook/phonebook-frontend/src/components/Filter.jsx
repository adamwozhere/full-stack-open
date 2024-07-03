const Filter = ({ filter, onFilterChange }) => {
  return (
    <div>
      <label htmlFor="filter">Filter shown with: </label>
      <input id="filter" type="test" value={filter} onChange={onFilterChange} />
    </div>
  );
};

export default Filter;

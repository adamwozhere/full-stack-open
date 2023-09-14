const Search = ({ search, onSearchChange }) => {
  return (
    <div>
      <label htmlFor="search">Find countries</label>
      <input type="text" value={search} onChange={onSearchChange} />
    </div>
  );
};

export default Search;

import { useApolloClient } from '@apollo/client';
import { Link } from 'react-router-dom';

const NavMenu = ({ token, setToken }) => {
  const client = useApolloClient();

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <Link to="/">Authors</Link>&nbsp;
      <Link to="/books">Books</Link>&nbsp;
      {!token ? (
        <Link to="/login">Login</Link>
      ) : (
        <>
          <Link to="/add-book">Add book</Link>
          <Link to="/recommended">Recommended</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default NavMenu;


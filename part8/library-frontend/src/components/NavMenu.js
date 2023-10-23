import { useApolloClient } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';

const NavMenu = ({ token, setToken }) => {
  const client = useApolloClient();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    navigate('/');
  };

  return (
    <div>
      <Link to="/">Authors</Link>&nbsp;
      <Link to="/books">Books</Link>&nbsp;
      {!token ? (
        <Link to="/login">Login</Link>
      ) : (
        <>
          <Link to="/add-book">Add book</Link>&nbsp;
          <Link to="/recommended">Recommended</Link>&nbsp;
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default NavMenu;


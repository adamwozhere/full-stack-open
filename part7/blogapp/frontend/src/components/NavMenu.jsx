import { Link } from 'react-router-dom';

const NavMenu = ({ user, login, logout }) => {
  return (
    <div>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      {user ? (
        <span>
          Logged in as {user.name}{' '}
          <button onClick={() => logout()}>logout</button>
        </span>
      ) : null}
    </div>
  );
};

export default NavMenu;

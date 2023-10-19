import { Link } from 'react-router-dom';

const NavMenu = () => {
  return (
    <div>
      <Link to="/">Authors</Link>&nbsp;
      <Link to="/books">Books</Link>&nbsp;
      <Link to="/add-book">Add book</Link>
    </div>
  );
};

export default NavMenu;


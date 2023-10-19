import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';

import { Routes, Route } from 'react-router-dom';
import NavMenu from './NavMenu';

const App = () => {
  return (
    <div>
      <NavMenu />
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<NewBook />} />
      </Routes>

      {/* <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} /> */}
    </div>
  );
};

export default App;


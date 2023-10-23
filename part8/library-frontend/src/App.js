import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import NavMenu from './components/NavMenu';
import Recommended from './components/Recommended';

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <div>
      <NavMenu token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Authors token={token} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<NewBook token={token} />} />
        <Route path="/recommended" element={<Recommended token={token} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    </div>
  );
};

export default App;


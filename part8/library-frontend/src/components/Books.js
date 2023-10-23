import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = () => {
  const [genre, setGenre] = useState('All');

  const result = useQuery(ALL_BOOKS);

  if (result.loading) {
    return (
      <div>
        <h2>Books</h2>
        <p>Loading...</p>
      </div>
    );
  }

  const books = result.data.allBooks;

  const genres = new Set();
  books.forEach((book) => book.genres.forEach((genre) => genres.add(genre)));
  const genreButtons = Array.from(genres);

  const booksByGenre = books.filter(
    (book) => genre === 'All' || book.genres.includes(genre)
  );

  return (
    <div>
      <h2>Books</h2>
      <div>
        <button onClick={() => setGenre('All')}>All</button>
        {genreButtons.map((g) => (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
        <h3>Genre: {genre}</h3>
      </div>

      <table>
        <tbody>
          <tr>
            <th>book</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksByGenre.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;


import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = () => {
  const [genre, setGenre] = useState('All');

  const genreData = useQuery(ALL_BOOKS);

  const { data, loading, refetch } = useQuery(ALL_BOOKS);

  if (loading || genreData.loading) {
    return (
      <div>
        <h2>Books</h2>
        <p>Loading...</p>
      </div>
    );
  }

  const books = data.allBooks;

  const set = new Set();
  genreData.data.allBooks.forEach((book) =>
    book.genres.forEach((genre) => set.add(genre))
  );
  const genres = Array.from(set);

  const selectGenre = (genre) => {
    setGenre(genre);
    refetch({ genre: genre === 'All' ? '' : genre });
  };

  return (
    <div>
      <h2>Books</h2>
      <div>
        <button onClick={() => selectGenre('All')}>All</button>
        {data &&
          genres.map((g) => (
            <button key={g} onClick={() => selectGenre(g)}>
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
          {data &&
            books.map((a) => (
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


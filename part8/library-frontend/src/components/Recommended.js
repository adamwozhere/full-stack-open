import { useQuery } from '@apollo/client';
import { BOOKS_BY_GENRE, ME } from '../queries';

const Recommended = () => {
  const { data: userData } = useQuery(ME);
  const genre = userData?.me?.favoriteGenre;

  console.log('user', JSON.stringify(genre));
  const { data: booksData, loading } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
  });

  if (loading) {
    return (
      <div>
        <h2>Books</h2>
        <p>Loading...</p>
      </div>
    );
  }

  const books = booksData.allBooks;

  return (
    <div>
      <h2>Recommended books</h2>

      <h3>
        In genre: <b>{genre}</b>
      </h3>

      <table>
        <tbody>
          <tr>
            <th>book</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
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

export default Recommended;


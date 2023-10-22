import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = () => {
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

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
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

export default Books;


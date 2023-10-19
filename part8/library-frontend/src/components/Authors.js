import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';
import { useState } from 'react';

const Authors = () => {
  const [authorName, setAuthorName] = useState('');
  const [authorBirthYear, setAuthorBirthYear] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n');
      console.log(messages);
    },
  });

  const handleUpdateAuthor = (event) => {
    event.preventDefault();

    console.log('edit author');
    editAuthor({
      variables: { name: authorName, setBornTo: parseInt(authorBirthYear) },
    });
    setAuthorName('');
    setAuthorBirthYear('');
  };

  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return (
      <div>
        <h2>Authors</h2>
        <p>Loading...</p>
      </div>
    );
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birth year</h2>
      <form onSubmit={handleUpdateAuthor}>
        <select
          name="author-name"
          id="author-name"
          value={authorName}
          onChange={({ target }) => setAuthorName(target.value)}
        >
          <option value="select">Select an author</option>
          {authors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          <input
            type="number"
            name="birth-year"
            id="birth-year"
            value={authorBirthYear}
            onChange={({ target }) => setAuthorBirthYear(target.value)}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

export default Authors;


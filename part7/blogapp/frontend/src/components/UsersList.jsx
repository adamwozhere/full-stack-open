import { useQuery } from '@tanstack/react-query';
import usersService from '../services/users';
import { Link } from 'react-router-dom';
import { Title } from './Title';

const UsersList = () => {
  const response = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
  });

  if (response.isLoading) {
    return <div>Loading...</div>;
  }

  const users = response.data;

  return (
    <div>
      <Title>Users</Title>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;

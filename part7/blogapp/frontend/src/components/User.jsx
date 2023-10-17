import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import usersService from '../services/users';

import { Title } from './Title';

const User = () => {
  const id = useParams().id;
  const response = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
  });

  if (response.isLoading) {
    return <div>Loading...</div>;
  }

  const user = response.data.find((user) => user.id === id);

  return (
    <div>
      <Title>{user.name}</Title>
      <h2>Added blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;

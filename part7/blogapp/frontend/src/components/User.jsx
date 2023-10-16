import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import usersService from '../services/users';

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
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;

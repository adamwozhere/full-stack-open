import { useQuery } from '@tanstack/react-query';
import blogService from '../services/blogs';
import Toggleable from './Toggleable';
import NewBlogForm from './NewBlogForm';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

import { Title } from './Title';

const BlogList = ({ user, handleNewBlog, blogFormRef }) => {
  const response = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  });

  if (!user) {
    return <LoginForm />;
  }
  if (response.isLoading) {
    return <div>Loading blogs...</div>;
  }

  if (response.isError) {
    return <div>Error: {response.error.message}</div>;
  }

  const blogs = response.data.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <Title>Blog App</Title>
      <Toggleable label="new blog" ref={blogFormRef}>
        <NewBlogForm createBlog={handleNewBlog} />
      </Toggleable>
      <br />
      <div>
        <ul>
          {blogs.map((blog) => {
            return (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} - {blog.author}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BlogList;

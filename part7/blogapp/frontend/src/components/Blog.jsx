import { useQuery } from '@tanstack/react-query';
import blogService from '../services/blogs';
import { useParams } from 'react-router-dom';

const Blog = ({ likeBlog, user, removeBlog }) => {
  const id = useParams().id;
  const response = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  });

  if (response.isLoading) {
    return <div>Loading...</div>;
  }

  const blog = response.data.find((blog) => blog.id === id);

  return (
    <div>
      <h1>Blog App</h1>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <span>{blog.likes} likes </span>
        <button onClick={() => likeBlog(blog)}>like</button>
      </div>
      <p>added by {blog.user.name}</p>
      {user.username === blog.user.username ? (
        <button onClick={() => removeBlog(blog)}>remove</button>
      ) : null}
      <h2>Comments</h2>
      {blog.comments.length === 0 ? <p>No comments yet</p> : null}
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index + comment.slice(-1)}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;

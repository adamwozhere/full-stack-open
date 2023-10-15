import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '../requests';
import Toggleable from './Toggleable';
import NewBlogForm from './NewBlogForm';
import Blog from './Blog';

const BlogList = ({
  user,
  handleLogout,
  handleNewBlog,
  handleLike,
  handleRemove,
  blogFormRef,
}) => {
  const response = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  });

  if (response.isLoading) {
    return <div>Loading blogs...</div>;
  }

  if (response.isError) {
    return <div>Error: {response.error.message}</div>;
  }

  const blogs = response.data;

  return (
    <div>
      <h2>blogs</h2>
      <span>Logged in as {user.name}</span>{' '}
      <button type="button" onClick={handleLogout}>
        Log Out
      </button>
      <Toggleable label="new blog" ref={blogFormRef}>
        <NewBlogForm createBlog={handleNewBlog} />
      </Toggleable>
      <br />
      <div>
        {blogs.map((blog) => {
          return (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={handleLike}
              removeBlog={handleRemove}
              currentUser={user}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;

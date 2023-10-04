import { useState } from 'react';

const Blog = ({ blog, likeBlog, removeBlog, currentUser }) => {
  const [expanded, setExpanded] = useState(false);

  const blogStyle = {
    border: '1px solid black',
    borderRadius: '4px',
    padding: '0.5em 1em',
    marginTop: '0.5em',
  };

  console.log('currentUser', currentUser, 'blogUser', blog.user);
  return (
    <div style={blogStyle}>
      <div>
        <span>
          {blog.title} {blog.author} &nbsp;
        </span>
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? 'hide' : 'view'}
        </button>
      </div>
      <div style={{ display: expanded ? '' : 'none' }}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{' '}
          <button onClick={() => likeBlog(blog)}>like</button>
        </div>
        <div>{blog.user?.name}</div>
        {currentUser.username === blog.user?.username ? (
          <button onClick={() => removeBlog(blog)}>remove</button>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;

// note: user is displayed by using user? as earlier default posts have no assigned user


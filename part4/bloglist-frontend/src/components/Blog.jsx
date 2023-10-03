import { useState } from 'react';

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false);

  const blogStyle = {
    border: '1px solid black',
    borderRadius: '4px',
    padding: '0.5em 1em',
    marginTop: '0.5em',
  };

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
          likes {blog.likes} <button>like</button>
        </div>
        <div>{blog.user?.name}</div>
      </div>
    </div>
  );
};

export default Blog;

// note: user is displayed by using user? as earlier default posts have no assigned user

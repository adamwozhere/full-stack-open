import React from 'react';
import { useState } from 'react';

import Button from './Button';

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    createBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new</h2>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">URL</label>
        <input
          type="text"
          id="url"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <Button type="submit">Create</Button>
    </form>
  );
};

export default NewBlogForm;

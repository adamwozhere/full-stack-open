import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders title and author, and not url or likes', () => {
  const blog = {
    title: 'Test title',
    author: 'Jest',
    url: 'http://example.com',
    likes: 3,
    user: {
      username: 'jestTester',
      name: 'Jest',
    },
  };

  const rootUser = {
    username: 'root',
    name: 'root',
  };

  const { container } = render(<Blog blog={blog} currentUser={rootUser} />);

  const titleAndAuthor = container.querySelector('.blog span');
  expect(titleAndAuthor).toHaveTextContent('Test title Jest');

  const url = container.querySelector('.blog .url');
  expect(url).not.toBeVisible();

  const likes = container.querySelector('.blog .likes');
  expect(url).not.toBeVisible();
});


import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  let container;
  let mockHandler;

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

  beforeEach(() => {
    mockHandler = jest.fn();
    container = render(
      <Blog blog={blog} currentUser={rootUser} likeBlog={mockHandler} />,
    ).container;
  });

  test('at start, title and author are displayed', () => {
    const titleAndAuthor = container.querySelector('.blog span');
    expect(titleAndAuthor).toHaveTextContent('Test title Jest');
  });

  test('at start, url and likes are not displayed', () => {
    const url = container.querySelector('.blog .url');
    expect(url).not.toBeVisible();

    const likes = container.querySelector('.blog .likes');
    expect(likes).not.toBeVisible();
  });

  test('clicking the like button twice calls the event handler twice', async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText('view');
    await user.click(viewButton);

    const likeButton = screen.getByText('like');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });

  test('after clicking view button, url and likes are displayed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const url = container.querySelector('.blog .url');
    expect(url).toBeVisible();

    const likes = container.querySelector('.blog .likes');
    expect(likes).toBeVisible();
  });
});

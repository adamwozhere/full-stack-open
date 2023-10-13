import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewBlogForm from './NewBlogForm';

describe('<NewBlogForm />', () => {
  test('calls the event handler with correct details', async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    const { container } = render(<NewBlogForm createBlog={createBlog} />);

    const titleInput = container.querySelector('#title');
    await user.type(titleInput, 'testing form title');

    const authorInput = container.querySelector('#author');
    await user.type(authorInput, 'Jest');

    const urlInput = container.querySelector('#url');
    await user.type(urlInput, 'http://test.com');

    const submitButton = screen.getByText('Create');
    await user.click(submitButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe('testing form title');
    expect(createBlog.mock.calls[0][0].author).toBe('Jest');
    expect(createBlog.mock.calls[0][0].url).toBe('http://test.com');
  });
});

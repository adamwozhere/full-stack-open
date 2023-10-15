import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import NewBlogForm from './components/NewBlogForm';
import Toggleable from './components/Toggleable';
import { useNotify } from './NotificationContext';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlog, getBlogs } from './requests';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  const notify = useNotify();

  // useEffect(() => {
  //   blogService
  //     .getAll()
  //     .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  // }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogsAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('login');

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedInBlogsAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      notify({
        text: 'Wrong credentials',
        type: 'error',
      });
      // would it be better to reset the fields in error state also?
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedInBlogsAppUser');
  };

  const queryClient = useQueryClient();
  const blogMutation = useMutation({
    // mutationFn: createBlog,
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog));
    },
  });

  const handleNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      const blog = await blogMutation.mutateAsync(blogObject);

      console.log('mutation response:', blog);

      // const blog = await blogService.create(blogObject);
      // setBlogs((prev) => [...prev, blog].sort((a, b) => b.likes - a.likes));

      notify({
        text: `New blog: ${blog.title} by ${blog.author} added`,
        type: 'success',
      });
    } catch (exception) {
      notify({
        text: exception.message,
        type: 'error',
      });
    }
  };

  const handleLike = async (blogObject) => {
    const likedBlog = {
      id: blogObject.id,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url,
      user: blogObject.user,
      likes: Number(blogObject.likes) + 1,
    };

    try {
      const updatedBlog = await blogService.update(likedBlog);
      setBlogs((prev) =>
        prev
          .map((blog) => (blog === blogObject ? updatedBlog : blog))
          .sort((a, b) => b.likes - a.likes),
      );
    } catch (exception) {
      notify({
        text: exception.message,
        type: 'error',
      });
    }
  };

  const handleRemove = async (blogObject) => {
    try {
      await blogService.remove(blogObject);
      setBlogs((prev) =>
        prev
          .filter((blog) => blog.id !== blogObject.id)
          .sort((a, b) => b.likes - a.likes),
      );
      notify({
        text: `blog: ${blogObject.title} removed`,
        type: 'success',
      });
    } catch (exception) {
      notify({
        text: exception.message,
        type: 'error',
      });
    }
  };

  return (
    <div>
      <h1>Blogs</h1>

      <Notification />

      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <BlogList
          user={user}
          handleLogout={handleLogout}
          handleNewBlog={handleNewBlog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          blogFormRef={blogFormRef}
        />
      )}
    </div>
  );
};

export default App;

// approx 8hr 30min - exercise 7.11 working but needs refactoring and tidying up

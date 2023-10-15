import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import NewBlogForm from './components/NewBlogForm';
import Toggleable from './components/Toggleable';
import { useNotify } from './NotificationContext';
import { useUser } from './UserContext';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  const notify = useNotify();

  const [user, userDispatch] = useUser();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogsAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // should this code be handled with another function?
      userDispatch({ type: 'SET_USER', payload: user });
      userDispatch({ type: 'SET_TOKEN', payload: user.token });
      blogService.setToken(user.token);
    }
  }, [userDispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('login');

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedInBlogsAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      // should this code be handled with another function?
      // e.g. to 'get user' either from json, or from state
      // and to set token to state ?
      // should not be using local storage for token at all?
      userDispatch({ type: 'SET_USER', payload: user });
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
    // setUser(null);
    userDispatch({ type: 'UNSET' });
    window.localStorage.removeItem('loggedInBlogsAppUser');
  };

  const queryClient = useQueryClient();

  const blogMutation = useMutation({
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

  const likeMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      console.log('liked blog:', updatedBlog);
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
      );
    },
  });

  const handleLike = async (blogObject) => {
    console.log('handleLike');
    const likedBlog = {
      id: blogObject.id,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url,
      user: blogObject.user,
      likes: Number(blogObject.likes) + 1,
    };

    try {
      console.log('liking blog');
      const updatedBlog = await likeMutation.mutateAsync(likedBlog);
      // setBlogs((prev) =>
      //   prev
      //     .map((blog) => (blog === blogObject ? updatedBlog : blog))
      //     .sort((a, b) => b.likes - a.likes),
      // );
    } catch (exception) {
      notify({
        text: exception.message,
        type: 'error',
      });
    }
  };

  const deleteMutation = useMutation({
    mutationFn: blogService.remove,
  });

  const handleRemove = async (blogObject) => {
    try {
      await deleteMutation.mutateAsync(blogObject);

      // cant put this in onSuccess in deleteMutation as axios DELETE does not return the object
      queryClient.setQueryData(['blogs'], (blogs) =>
        blogs.filter((blog) => blog.id !== blogObject.id),
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

// approx 11hr - exercise 7.13 - user with useReducer - have not implemented sorting
// note: onSuccess useMutation doesn't work for the deleting a record,
// as the axios request doesn't return the deleted object,
// I've used a useMutationAsync and moved the setting state logic to the handler instead with await
// (which is different from the 'like' mutation -- check with the solution after submitting to see if there is a better way,
// perhaps all the useQuery mutations etc should be all put in the services file, and just the axios requests in requests file?)
// also not sure how the reducer should be handled for the User - should there be separate helper functions for logging in / out
// and should the token be stored just in the user reducer state and not browser storage. Do I still need useEffect to detect the user at the start?

import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import { useNotify } from './NotificationContext';
import { useUser } from './UserContext';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Routes, Route, useNavigate } from 'react-router-dom';
import UsersList from './components/UsersList';
import User from './components/User';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import NavMenu from './components/NavMenu';

import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Arial', sans-serif;
`;

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogFormRef = useRef();

  const navigate = useNavigate();

  const notify = useNotify();

  const [user, userDispatch] = useUser();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogsAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // should this code be handled with another function?
      console.log('user is', user);
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
      // perhaps navigate should not happen until awaiting deleteMutation,
      // but then there is an error in console as the Blog is momentarily trying to render missing data

      navigate('/');

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

  const commentMutation = useMutation({
    mutationFn: blogService.comment,
    onSuccess: (commentedBlog) => {
      console.log('commented blog:', commentedBlog);
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) =>
          blog.id === commentedBlog.id ? commentedBlog : blog,
        ),
      );
    },
  });

  const handleComment = async (blogObject, comment) => {
    try {
      const commentObject = {
        id: blogObject.id,
        comment: comment,
      };

      const response = await commentMutation.mutateAsync(commentObject);
    } catch (error) {
      console.log(`Error:`, error.message);
    }
  };

  return (
    <Wrapper>
      <NavMenu user={user} logout={handleLogout} />

      <Notification />
      <Routes>
        <Route
          path="/"
          element={
            user === null ? (
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
            )
          }
        />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<User />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              likeBlog={handleLike}
              user={user}
              removeBlog={handleRemove}
              createComment={handleComment}
            />
          }
        />
      </Routes>
    </Wrapper>
  );
};

export default App;

// approx 15 hr 30 min - exercise 7.20, 7.21 - added some styling with StyledComponents

// NOTE: there is no error checking for the reqests for comments - because I have not set this up properly?
// perhaps a Comments model is needed in Mongoose, or some error checking in the route handler?
// e.g. it does not error if you send a request body that doesn't have / is different to 'comment' key

// Note: onSuccess useMutation doesn't work for the deleting a record,
// as the axios request doesn't return the deleted object,
// I've used a useMutationAsync and moved the setting state logic to the handler instead with await
// (which is different from the 'like' mutation -- check with the solution after submitting to see if there is a better way,
// perhaps all the useQuery mutations etc should be all put in the services file, and just the axios requests in requests file?)
// also not sure how the reducer should be handled for the User - should there be separate helper functions for logging in / out
// Do I still need useEffect to detect the user at the start? Should it test the token to see if it's timed out on loading?

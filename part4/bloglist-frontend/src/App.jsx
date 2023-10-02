import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import NewBlogForm from './components/NewBlogForm';
import Toggleable from './components/Toggleable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
      setNotificationMessage({ text: 'Wrong credentials', type: 'error' });
      // would it be better to reset the fields in error state also?
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedInBlogsAppUser');
  };

  const handleNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      const blog = await blogService.create(blogObject);
      setBlogs((prev) => [...prev, blog]);
      setNotificationMessage({
        text: `New blog: ${blog.title} by ${blog.author} added`,
      });
      setTimeout(() => setNotificationMessage(null), 5000);
    } catch (exception) {
      setNotificationMessage({ text: exception.message, type: 'error' });
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );

  const blogsList = () => (
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
          console.log(blog.id);
          return <Blog key={blog.id} blog={blog} />;
        })}
      </div>
    </div>
  );

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={notificationMessage} />

      {user === null ? loginForm() : blogsList()}
    </div>
  );
};

export default App;

// approx 4hr 20min - finished exercise 5.6


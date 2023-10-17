import Button from './Button';
import { Title } from './Title';

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <div>
      <Title>Log in</Title>
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
        <Button id="login-button" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;

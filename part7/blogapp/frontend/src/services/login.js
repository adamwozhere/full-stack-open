import axios from 'axios';
const baseUrl = '/api/login';

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

// note: must be exported as `{ login }` in order to be imported as `import loginService from './services/login';`
// and then used as `loginService.login();`
// Otherwise `export default login` would neet to be both imported and used just as `login` as it is no longer in an object
export default { login };

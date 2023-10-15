import axios from 'axios';

const baseUrl = '/api/users';

const getAll = async () => axios.get(baseUrl).then((response) => response.data);

export default {
  getAll,
};

import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const getAll = () => {
  const request = axios.get(`${baseUrl}/persons`);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(`${baseUrl}/persons`, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/persons/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteResource = (id) => {
  const request = axios.delete(`${baseUrl}/persons/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, update, delete: deleteResource };

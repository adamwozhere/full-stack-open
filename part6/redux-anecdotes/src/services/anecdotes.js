import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const createNew = async (content) => {
  const object = asObject(content);
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const incrementVote = async (anecdote) => {
  const object = {
    content: anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes + 1,
  };

  const response = await axios.put(`${baseUrl}/${anecdote.id}`, object);
  return response.data;
};

const anecdoteService = {
  getAll,
  createNew,
  incrementVote,
};

export default anecdoteService;


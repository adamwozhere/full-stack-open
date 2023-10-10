import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

export const createAnecdote = (anecdote) => {
  const newAnecdote = {
    content: anecdote.content,
    votes: 0,
  };
  return axios.post(baseUrl, newAnecdote).then((res) => res.data);
};

export const updateAnecdote = (anecdote) => {
  const id = anecdote.id;
  return axios.put(`${baseUrl}/${id}`, anecdote).then((res) => res.data);
};


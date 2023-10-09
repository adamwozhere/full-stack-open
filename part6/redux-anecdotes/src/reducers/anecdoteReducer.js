import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const byVotesDescending = (a, b) => b.votes - a.votes;

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const anecdote = asObject(action.payload);
      state.push(anecdote);
      state.sort(byVotesDescending);
    },
    voteAnecdote(state, action) {
      state.find((item) => item.id === action.payload).votes += 1;
      state.sort(byVotesDescending);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});
export const { createAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const byVotesDescending = (a, b) => b.votes - a.votes;

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
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


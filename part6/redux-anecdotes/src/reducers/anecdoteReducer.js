import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const byVotesDescending = (a, b) => b.votes - a.votes;

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
      state.sort(byVotesDescending);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    updateAnecdote(state, action) {
      return state
        .map((anecdote) =>
          anecdote.id === action.payload.id ? action.payload : anecdote
        )
        .sort(byVotesDescending);
    },
  },
});

export const { appendAnecdote, setAnecdotes, updateAnecdote } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes.sort(byVotesDescending)));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.incrementVote(anecdote);
    dispatch(updateAnecdote(votedAnecdote));
  };
};

export default anecdoteSlice.reducer;


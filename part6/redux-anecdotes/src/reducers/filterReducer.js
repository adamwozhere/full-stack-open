import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

// NOTE: unsure of correct usage of reducers;
// state = action.payload fails with an error, but returning new state works,
// even though redux toolkit allows mutating state. (anecdoteFilter allos just setting the state variable but filter doesn't?)
// FULL STACK OPEN documentation also confusing as it mentions dispatch({ type: 'filter/setFilter, payload: 'filter' }) - but this does not work

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;


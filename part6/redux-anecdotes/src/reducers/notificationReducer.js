import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationText(state, action) {
      return action.payload;
    },
  },
});

export const { setNotificationText } = notificationSlice.actions;

export const setNotification = (text, durationInSeconds) => {
  return async (dispatch) => {
    dispatch(setNotificationText(text));
    setTimeout(
      () => dispatch(setNotificationText(null)),
      durationInSeconds * 1000
    );
  };
};
export default notificationSlice.reducer;


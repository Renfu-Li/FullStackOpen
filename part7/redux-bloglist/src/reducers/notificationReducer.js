import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    set(state, action) {
      return action.payload;
    },
  },
});

export const { set } = notificationSlice.actions;

export const setNotification = (message) => {
  return (dispatch) => {
    dispatch(set(message));
  };
};

export default notificationSlice.reducer;

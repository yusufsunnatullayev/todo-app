import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: JSON.parse(localStorage.getItem("loggedIn")) || false,
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

export const { setLoggedIn } = statusSlice.actions;
export default statusSlice.reducer;

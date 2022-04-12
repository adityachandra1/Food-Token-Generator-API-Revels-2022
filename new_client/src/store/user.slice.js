import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    jwt: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.jwt = action.payload.token;
    },
    update: (state, action) => {
      const prevUser = state.user;
      state.user = { ...prevUser, ...action.payload };
    },
    logout: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.jwt = null;
    },
  },
});

export const { login, update, logout } = userSlice.actions;
export default userSlice.reducer;

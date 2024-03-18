import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userAuth: null,
  },
  reducers: {
    isAuthenticated: (state, action) => {
      state.userAuth = action.payload;
    },
    //logout
    logout: (state) => {
      state.userAuth = null;
    },
  },
});
//Get the actions
export const { isAuthenticated, logout } = authSlice.actions;
//Get the reducer
const authReducer = authSlice.reducer;
export default authReducer;

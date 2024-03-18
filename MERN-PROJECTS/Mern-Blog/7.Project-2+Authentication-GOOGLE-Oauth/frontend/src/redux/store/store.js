import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlices";

//create store
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

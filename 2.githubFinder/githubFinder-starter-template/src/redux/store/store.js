import { configureStore } from "@reduxjs/toolkit";
import reposReducer from "../slices/githubSlices";
const store = configureStore({
  reducer: {
    repos: reposReducer,
  },
});

export default store;

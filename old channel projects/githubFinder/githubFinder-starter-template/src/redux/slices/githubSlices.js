import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//create action for repos
export const fetchReposAction = createAsyncThunk(
  "repos/list",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      //make http call
      const { data } = await axios.get(
        `https://api.github.com/users/${user}/repos?per_page=30&sort=asc`
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response);
    }
  }
);

//create action user profile
export const fetchProfileAction = createAsyncThunk(
  "profile/list",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      //make http call
      const { data } = await axios.get(`https://api.github.com/users/${user}`);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response);
    }
  }
);

//slices

const reposSlices = createSlice({
  name: "repos",
  initialState: { user: "Emma" },
  extraReducers: builder => {
    //repos reduces
    builder.addCase(fetchReposAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchReposAction.fulfilled, (state, action) => {
      state.loading = false;
      state.reposList = action?.payload;
      state.error = undefined;
    });
    builder.addCase(fetchReposAction.rejected, (state, action) => {
      state.loading = false;
      state.reposList = undefined;
      state.error = action?.payload;
    });
    //profile
    builder.addCase(fetchProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action?.payload;
      state.error = undefined;
    });
    builder.addCase(fetchProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.profile = undefined;
      state.error = action?.payload;
    });
  },
});

//get the reducer
export default reposSlices.reducer;

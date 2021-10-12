import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//Actions for redirect
export const resetExpCreated = createAction("expense/created/reset");
export const resetExpUpdate = createAction("expense/update/reset");

//Create action
export const createExpAction = createAsyncThunk(
  "expense/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      //make http call here
      const { data } = await axios.post(`${baseURL}/expenses`, payload, config);
      //dispatch
      dispatch(resetExpCreated());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch all expenses
export const fetchAllExpAction = createAsyncThunk(
  "expense/fetch-all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users?.userAuth;
    const config = {
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${baseURL}/expenses?page=${payload}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Create action
export const updateExpAction = createAsyncThunk(
  "expense/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      //make http call here
      const { data } = await axios.put(
        `${baseURL}/expenses/${payload?.id}`,
        payload,
        config
      );
      dispatch(resetExpUpdate());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//slices

const expenseSlices = createSlice({
  name: "expenses",
  initialState: {},
  extraReducers: builder => {
    //   Create Expense
    builder.addCase(createExpAction.pending, (state, action) => {
      state.loading = true;
    });
    //reset action
    builder.addCase(resetExpCreated, (state, acyion) => {
      state.isExpCreated = true;
    });
    builder.addCase(createExpAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expenseCreated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isExpCreated = false;
    });
    builder.addCase(createExpAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });

    //   fetch all Expense
    builder.addCase(fetchAllExpAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllExpAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expenseList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAllExpAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });

    //   update Expense
    builder.addCase(updateExpAction.pending, (state, action) => {
      state.loading = true;
    });
    //reset action
    builder.addCase(resetExpUpdate, (state, acyion) => {
      state.isExpUpdated = true;
    });
    builder.addCase(updateExpAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expenseUpdated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateExpAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });
  },
});

export default expenseSlices.reducer;

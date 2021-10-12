import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//Login action
export const loginUserAction = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      //make http call here
      const { data } = await axios.post(
        `${baseURL}/users/login`,
        payload,
        config
      );
      //Save user into localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Logout action
export const logout = createAsyncThunk(
  "user/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //Save user into localstorage
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//register action
export const registerUserAction = createAsyncThunk(
  "user/register",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      //make http call here
      const { data } = await axios.post(
        `${baseURL}/users/register`,
        payload,
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

//profile
export const userProfileAction = createAsyncThunk(
  "user/profile",
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
      const { data } = await axios.get(`${baseURL}/users/profile`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//update
export const updateProfileAction = createAsyncThunk(
  "user/update",
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
        `${baseURL}/users/update`,
        {
          firstname: payload?.firstname,
          lastname: payload?.lastname,
          email: payload?.email,
        },
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

//slices
//Get user from local storage and place it inside our store;
const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : undefined;

const usersSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: userLoginFromStorage,
  },
  extraReducers: builder => {
    //   Login action
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    //handle success state
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.userLoading = false;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    //handle rejected state
    builder.addCase(loginUserAction.rejected, (state, action) => {
      console.log(action);
      state.userLoading = false;
      state.userAppErr = action?.payload?.msg;
      state.userServerErr = action?.error?.msg;
    });
    //   Register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.userLoading = true;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    //handle success state
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.isRegistered = true;
      state.userLoading = false;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    //handle rejected state
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppErr = action?.payload?.msg;
      state.userServerErr = action?.error?.msg;
    });
    // Logout
    builder.addCase(logout.fulfilled, (state, action) => {
      state.userAuth = undefined;
      state.userLoading = false;
    });

    //Profile
    builder.addCase(userProfileAction.pending, (state, action) => {
      state.loading = true;
      state.AppErr = undefined;
      state.ServerErr = undefined;
    });
    //handle success state
    builder.addCase(userProfileAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.loading = false;
      state.AppErr = undefined;
      state.ServerErr = undefined;
    });
    //handle rejected state
    builder.addCase(userProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.AppErr = action?.payload?.msg;
      state.ServerErr = action?.error?.msg;
    });

    //update
    builder.addCase(updateProfileAction.pending, (state, action) => {
      state.loading = true;
      state.AppErr = undefined;
      state.ServerErr = undefined;
    });
    //handle success state
    builder.addCase(updateProfileAction.fulfilled, (state, action) => {
      state.userUpdate = action?.payload;
      state.isEdited = true;
      state.loading = false;
      state.AppErr = undefined;
      state.ServerErr = undefined;
    });
    //handle rejected state
    builder.addCase(updateProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.AppErr = action?.payload?.msg;
      state.ServerErr = action?.error?.msg;
    });
  },
});

export default usersSlices.reducer;

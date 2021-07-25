import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../slices/weatherSlices";
const store = configureStore({
  reducer: weatherReducer,
});
export default store;

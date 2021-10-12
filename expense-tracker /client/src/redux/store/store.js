import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import expensesReducer from "../slices/expenses/expensesSlices";
import incomeReducer from "../slices/income/incomeSlices";
import account from "../slices/accountsStats/accountStatSlices";
const store = configureStore({
  reducer: {
    users: usersReducer,
    expenses: expensesReducer,
    income: incomeReducer,
    account,
  },
});

export default store;

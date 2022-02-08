import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import EditContent from "./components/EditContent";
import AdminRoute from "./components/Navigation/AdminRoute";
import Navbar from "./components/Navigation/Navbar";
import ProtectedRoute from "./components/Navigation/ProtectedRoute";
import NotAdmin from "./components/NotAdmin";
import AddExpense from "./pages/expense/AddExpense";
import ExpensesList from "./pages/expense/ExpensesList";
import Home from "./pages/Home";
import AddIncome from "./pages/income/AddIncome";
import IncomeList from "./pages/income/IncomeList";
import DashboardData from "./pages/users/DashboardData";
import Login from "./pages/users/Login";
import Profile from "./pages/users/Profile";
import Register from "./pages/users/Register";
import UpdateProfile from "./pages/users/UpdateProfile";
import UserProfileExpList from "./pages/users/UserProfileExpList";
import UserProfileIncList from "./pages/users/UserProfileIncList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute exact path="/expenses" component={ExpensesList} />
        <ProtectedRoute exact path="/incomes" component={IncomeList} />
        <ProtectedRoute exact path="/edit" component={EditContent} />
        <ProtectedRoute
          exact
          path="/update-profile"
          component={UpdateProfile}
        />
        <ProtectedRoute
          exact
          path="/user-expenses"
          component={UserProfileExpList}
        />
        <ProtectedRoute
          exact
          path="/user-income"
          component={UserProfileIncList}
        />
        <ProtectedRoute exact path="/dashboard" component={DashboardData} />
        <Route exact path="/not-found" component={NotAdmin} />
        <ProtectedRoute exact path="/add-income" component={AddIncome} />
        <ProtectedRoute exact path="/add-expense" component={AddExpense} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

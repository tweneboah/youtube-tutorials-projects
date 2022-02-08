import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  //check if user is login in
  const userLogin = useSelector(state => state?.users?.userAuth);
  return (
    <Route
      {...rest}
      render={() =>
        userLogin ? <Component {...rest} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;

import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateProtectRoute = ({ component: Component, ...rest }) => {
  //check if user is loggin
  const user = useSelector(state => state?.users);
  const { userAuth } = user;
  return (
    <Route
      {...rest}
      render={() =>
        userAuth ? <Component {...rest} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateProtectRoute;

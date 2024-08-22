// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePrivy } from "@privy-io/react-auth";

const PrivateRoute = ({ children }) => {
  const { authenticated, ready } = usePrivy();

  if (!ready) {
    // You might want to show a loading spinner here
    return <div>Loading...</div>;
  }

  return authenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

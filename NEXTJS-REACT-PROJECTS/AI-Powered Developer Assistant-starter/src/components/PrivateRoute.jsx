import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

const PrivateRoute = ({ children }) => {
  return children;
};

export default PrivateRoute;

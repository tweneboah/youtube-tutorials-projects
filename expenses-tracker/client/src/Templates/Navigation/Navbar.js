import React from "react";
import { useSelector } from "react-redux";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";

const Navbar = () => {
  const users = useSelector(state => state?.users);

  const { userAuth } = users;
  return <>{userAuth ? <PrivateNavbar /> : <PublicNavbar />}</>;
};

export default Navbar;

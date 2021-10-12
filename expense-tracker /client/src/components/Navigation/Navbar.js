import React from "react";
import { useSelector } from "react-redux";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";

const Navbar = () => {
  const userLogin = useSelector(state => state?.users?.userAuth);
  console.log(userLogin);
  return <>{userLogin ? <PrivateNavbar /> : <PublicNavbar />}</>;
};

export default Navbar;

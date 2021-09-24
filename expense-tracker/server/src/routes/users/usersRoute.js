const express = require("express");
const {
  registerUser,
  fetchUsersCtrl,
  loginUserCtrl,
} = require("../../controllers/users/usersCtrl");

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUserCtrl);
userRoute.get("/", fetchUsersCtrl);
module.exports = userRoute;

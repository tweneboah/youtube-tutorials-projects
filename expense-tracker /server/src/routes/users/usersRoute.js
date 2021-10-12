const express = require("express");
const {
  registerUser,
  fetchUsersCtrl,
  loginUserCtrl,
  userProfileCtrl,
  updateUserCtrl,
} = require("../../controllers/users/usersCtrl");
const authMiddleware = require("../../middlewares/authMiddleware");

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.get("/profile", authMiddleware, userProfileCtrl);
userRoute.put("/update", authMiddleware, updateUserCtrl);
userRoute.post("/login", loginUserCtrl);
userRoute.get("/", authMiddleware, fetchUsersCtrl);
module.exports = userRoute;

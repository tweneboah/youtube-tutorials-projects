const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/User/User");

//-----User Controller---

const userController = {
  // !Register
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    //Check if username already exist
    const userFound = await User.findOne({ username, email });
    if (userFound) {
      throw new Error("User already exists");
    }
    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //Register the user
    const userRegistered = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    //send the response
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      userRegistered,
    });
  }),
  // ! Login
  login: asyncHandler(async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      //check if user not found
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      //generate token
      const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET);
      //set the token into cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, //1 day
      });

      //send the response
      res.json({
        status: "success",
        message: "Login Success",
        username: user?.username,
        email: user?.email,
        _id: user?._id,
      });
    })(req, res, next);
  }),
};

module.exports = userController;

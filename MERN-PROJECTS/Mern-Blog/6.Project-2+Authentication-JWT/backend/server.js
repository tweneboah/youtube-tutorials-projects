require("dotenv").config();
const corse = require("cors");
const passport = require("./utils/passport-config");
const express = require("express");
const connectDB = require("./utils/connectDB");
const postRouter = require("./router/post/postsRouter");
const usersRouter = require("./router/user/usersRouter");
//call the db
connectDB();
const app = express();
//! PORT
const PORT = 5000;

//Middlewares
app.use(express.json()); //Pass json data
// corse middleware
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(corse(corsOptions));
// Passport middleware
app.use(passport.initialize());
//!---Route handlers
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", usersRouter);

//!Not found
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found on our server" });
});
//! Error handdling middleware
app.use((err, req, res, next) => {
  //prepare the error message
  const message = err.message;
  const stack = err.stack;
  res.status(500).json({
    message,
    stack,
  });
});

//!Start the server
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));

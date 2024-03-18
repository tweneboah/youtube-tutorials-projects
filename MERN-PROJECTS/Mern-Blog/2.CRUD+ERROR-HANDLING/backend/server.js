require("dotenv").config();
const corse = require("cors");
const asyncHandler = require("express-async-handler");
const express = require("express");
const Post = require("./models/Post/Post");
const connectDB = require("./utils/connectDB");
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
// ! Create post
app.post(
  "/api/v1/posts/create",
  asyncHandler(async (req, res) => {
    //get the payload
    const { title, description } = req.body;
    //find the post by title
    const postFound = await Post.findOne({ title });
    if (postFound) {
      throw new Error("Post already exists");
    }
    const postCreated = await Post.create({ title, description });
    res.json({
      status: "success",
      message: "Post created successfully",
      postCreated,
    });
  })
);
// ! List posts
app.get(
  "/api/v1/posts",
  asyncHandler(async (req, res) => {
    const posts = await Post.find();
    res.json({
      status: "success",
      message: "Post fetched successfully",
      posts,
    });
  })
);
// ! update post
app.put(
  "/api/v1/posts/:postId",
  asyncHandler(async (req, res) => {
    //get the post id from params
    const postId = req.params.postId;
    //find the post
    const postFound = await Post.findById(postId);
    if (!postFound) {
      throw new Error("Post  not found");
    }
    //update
    const postUpdted = await Post.findByIdAndUpdate(
      postId,
      { title: req.body.title, description: req.body.description },
      {
        new: true,
      }
    );
    res.json({
      status: "Post updated successfully",
      postUpdted,
    });
  })
);
// ! get post
app.get(
  "/api/v1/posts/:postId",
  asyncHandler(async (req, res) => {
    //get the post id from params
    const postId = req.params.postId;
    //find the post
    const postFound = await Post.findById(postId);
    res.json({
      status: "success",
      message: "Post fetched successfully",
      postFound,
    });
  })
);
// ! delete post
app.delete(
  "/api/v1/posts/:postId",
  asyncHandler(async (req, res) => {
    //get the post id from params
    const postId = req.params.postId;
    //find the post
    await Post.findByIdAndDelete(postId);
    res.json({
      status: "success",
      message: "Post deleted successfully",
    });
  })
);
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

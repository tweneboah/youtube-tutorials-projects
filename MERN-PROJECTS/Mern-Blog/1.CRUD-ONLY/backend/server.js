require("dotenv").config();
const corse = require("cors");
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
app.post("/api/v1/posts/create", async (req, res) => {
  try {
    //get the payload
    const postData = req.body;
    console.log(req.body);
    const postCreated = await Post.create(postData);
    res.json({
      status: "success",
      message: "Post created successfully",
      postCreated,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
// ! List posts
app.get("/api/v1/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({
      status: "success",
      message: "Post fetched successfully",
      posts,
    });
  } catch (error) {
    res.json(error);
  }
});
// ! update post
app.put("/api/v1/posts/:postId", async (req, res) => {
  try {
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
  } catch (error) {
    throw new Error(error);
  }
});
// ! get post
app.get("/api/v1/posts/:postId", async (req, res) => {
  try {
    //get the post id from params
    const postId = req.params.postId;
    //find the post
    const postFound = await Post.findById(postId);
    res.json({
      status: "success",
      message: "Post fetched successfully",
      postFound,
    });
  } catch (error) {
    throw new Error(error);
  }
});
// ! delete post
app.delete("/api/v1/posts/:postId", async (req, res) => {
  try {
    //get the post id from params
    const postId = req.params.postId;
    //find the post
    await Post.findByIdAndDelete(postId);
    res.json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

//!Start the server
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));

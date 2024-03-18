const express = require("express");
const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");
const postController = require("../../controllers/posts/postController");
//!create instance express router
const postRouter = express.Router();

//-----Create post----

postRouter.post("/posts/create", postController.createPost);

//----lists all posts----
postRouter.get("/posts", postController.fetchAllPosts);

//----update post----
postRouter.put("/posts/:postId", postController.update);

//--- get post---
postRouter.get("/posts/:postId", postController.getPost);

//---delete post---
postRouter.delete("/posts/:postId", postController.delete);

module.exports = postRouter;

const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");

const postController = {
  //!Create post
  createPost: asyncHandler(async (req, res) => {
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
  }),

  //!list all posts
  fetchAllPosts: asyncHandler(async (req, res) => {
    const posts = await Post.find();
    res.json({
      status: "success",
      message: "Post fetched successfully",
      posts,
    });
  }),
  //! get a post
  getPost: asyncHandler(async (req, res) => {
    //get the post id from params
    const postId = req.params.postId;
    //find the post
    const postFound = await Post.findById(postId);
    res.json({
      status: "success",
      message: "Post fetched successfully",
      postFound,
    });
  }),
  //! delete
  delete: asyncHandler(async (req, res) => {
    //get the post id from params
    const postId = req.params.postId;
    //find the post
    await Post.findByIdAndDelete(postId);
    res.json({
      status: "success",
      message: "Post deleted successfully",
    });
  }),
  //! pdate post
  update: asyncHandler(async (req, res) => {
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
  }),
};

module.exports = postController;

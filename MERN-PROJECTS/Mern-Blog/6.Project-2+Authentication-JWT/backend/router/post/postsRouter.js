const express = require("express");
const multer = require("multer");
const postController = require("../../controllers/posts/postController");
const storage = require("../../utils/fileupload");
//create multer instance
const upload = multer({ storage });
//!create instance express router
const postRouter = express.Router();

//-----Create post----

postRouter.post("/create", upload.single("image"), postController.createPost);

//----lists all posts----
postRouter.get("/", postController.fetchAllPosts);

//----update post----
postRouter.put("/:postId", postController.update);

//--- get post---
postRouter.get("/:postId", postController.getPost);

//---delete post---
postRouter.delete("/:postId", postController.delete);

module.exports = postRouter;

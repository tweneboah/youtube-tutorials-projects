const mongoose = require("mongoose");
//schema
const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
    description: { type: String },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
//model
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;

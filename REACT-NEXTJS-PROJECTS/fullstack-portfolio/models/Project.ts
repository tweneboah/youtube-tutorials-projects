import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
      default: "",
    },
    githubUrl: {
      type: String,
      default: "",
    },
    liveUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Project = models.Project || model("Project", ProjectSchema);

export default Project;

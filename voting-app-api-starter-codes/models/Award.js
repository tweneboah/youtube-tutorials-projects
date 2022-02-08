const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//schema
const awardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId, //this represent the company
      ref: "User",
      required: true,
    },
    companyTitle: {
      //Admin will use this find awardcategories by company
      type: String,
      required: true,
    },
    companyUrlSlug: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    hasCategory: {
      type: Boolean,
      default: false,
    },
    hasExpired: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

//populate virtuals
awardSchema.virtual("categories", {
  ref: "AwardCategory",
  localField: "_id",
  foreignField: "mainAward",
});

//model
const Award = mongoose.model("Award", awardSchema);
module.exports = Award;

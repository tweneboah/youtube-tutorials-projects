const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const manualVotingSchema = new Schema(
  {
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    qyt: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    awardCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AwardCategory",
      required: true,
    },
    contestantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contestants",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: {
      virtuals: true,
    },
  }
);

//model
const MannualVoting = mongoose.model("MannualVoting", manualVotingSchema);

module.exports = MannualVoting;

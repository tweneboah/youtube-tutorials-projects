const mongoose = require("mongoose");

const contestantsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },

    reasons: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      required: true,
    },
    quotes: {
      type: String,
      required: true,
    },
    socialMediaLink: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
      default: "Pending",
    },

    awardCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AwardCategory",
    },
    mainAward: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Award",
      required: true,
    },
    companyApplyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    manualVotingCount: {
      type: Number,
      default: 0,
    },

    votingHistory: [{ type: Object }],
  },
  {
    timestamps: true,
    strict: false,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

//populate virtuals
contestantsSchema.virtual("comments", {
  ref: "ContestantsComment",
  localField: "_id",
  foreignField: "contestant",
});

//add total votes to virtual vote count
contestantsSchema.virtual("totalVotes").get(function () {
  const total = this.virtualVoteCount + this.manualVotingCount + this.ussdVotes;
  return total;
});

//create the model for users and expose it to our app
const Contestants = mongoose.model("Contestants", contestantsSchema);
module.exports = Contestants;

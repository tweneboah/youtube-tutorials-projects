//user schema with email, password, and name
const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    awardCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AwardCategory",
      required: true,
    },
    // mainAward: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "MainAward",
    //   required: true,
    // },
    contestantVotingFor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contestants",
      required: true,
    },
    transaction: {
      type: Object,
      required: true,
    },
    subAccName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//create the model for users and expose it to our app
const Transaction = mongoose.model("Transaction", transactionsSchema);
module.exports = Transaction;

//user schema with email, password, and name
const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    image: {
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
    companyTitle: {
      type: String,
      required: true,
    },
    companyUrlSlug: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isAccountVerified: { type: Boolean, default: false },
    accountVerificationToken: String,
    accountVerificationTokenExpires: Date,
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

//Verify account
userSchema.methods.createAccountVerificationToken = async function () {
  //create a token
  const verificationToken = crypto.randomBytes(32).toString("hex");
  this.accountVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  console.log("tojee", verificationToken);
  this.accountVerificationTokenExpires = Date.now() + 30 * 60 * 1000; //10 minutes
  return verificationToken;
};

//Password reset/forget
userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; //10 minutes
  return resetToken;
};

//Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//match password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

//create the model for users and expose it to our app
const User = mongoose.model("User", userSchema);
module.exports = User;

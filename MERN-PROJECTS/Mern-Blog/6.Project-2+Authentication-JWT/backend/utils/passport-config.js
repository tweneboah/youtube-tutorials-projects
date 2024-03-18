const passport = require("passport");
const User = require("../models/User/User");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

//! Configure passport local strategy

passport.use(
  new LocalStrategy(
    {
      usernameField: "username", //username/email
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: "Invalid login details" });
        }
        //verify the password
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid login details" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = passport;

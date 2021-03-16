const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userRegistration");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ userName: username }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            console.log(user);
            return done(null, user);
          } else {
            return done(null, false, { message: "Password is incorrect" });
          }
        });
      });
    })
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = mongoose.model("users");

// ## LOGIN ##
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, cb) => {
      return User.findOne({ email })
        .then(user => {
          if (!user) {
            return cb(null, false, { message: "Incorrect credentials" });
          }
          // match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (!isMatch) {
              return cb(null, false, { message: "User or password wrong" });
            }
            return cb(null, user, { message: "Logged in" });
          });
        })
        .catch(err => cb(err));
    }
  )
);

// ## AUTHENTICATION ##
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: require("../environment").secret
    },
    (jwt, cb) => {
      // ensure user exists
      User.findOne({ _id: jwt._id })
        .then(user => cb(null, user))
        .catch(err => cb(err));
    }
  )
);

const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
// ## DATABASE ##
require("./config/database");

// ## MODELS ##
require("./models/Project");
require("./models/Technology");
require("./models/User");
const Users = mongoose.model("users");

// ## AUTHENTICATION ##
require("./config/jwt_passport");
const jwt = require("jsonwebtoken");

const app = express();

// ## MIDDLEWARE ##
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Im alive"
  });
});

app.post("/register", (req, res) => {
  if (!req.body.email || !req.body.password || req.body.password2) {
    return res.status(422).json({ message: "missing data from request" });
  }
  if (req.body.password.length < 4) {
    return res.status(400).json({
      message: "Password has to be atlest 4 chars",
      user: user
    });
  }
  if (req.body.password !== req.body.password2) {
    return res.status(422).json({
      message: "Passwords do not matching",
      user: user
    });
  }
  return Users.find({ email: req.body.email }).then(users => {
    if (users.length > 0) {
      return res.status(409).json({
        message: "This email is already registered"
      });
    } else {
      const newUser = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      return bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user =>
              res.status(200).json({
                message: "User created",
                user
              })
            )
            .catch(err => {
              console.log("Error saving user", err);
              return res.status(500).json({
                message: "Saving user failed",
                err
              });
            });
        });
      });
    }
  });
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log(err);
      return res.status(400).json({
        message: "Something is not right with login",
        user
      });
    }
    req.login(user, { session: false }, err => {
      if (err) res.send(err);
    });
    const token = jwt.sign(user.toJSON(), require("./environment").secret);
    return res.json({ user, token });
  })(req, res);
});

// ## ROUTES ##
app.use("/api/v1", require("./routes/api"));

// ## start app ##
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Application started at http://localhost:${port}`);
});

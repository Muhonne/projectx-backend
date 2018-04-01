const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");

require("../models/User");
const User = mongoose.model("users");

router.get("/login", (req, res) => {
  res.render("users/login");
});

// AUTHENTICATE
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/projects",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post("/register", (req, res) => {
  let errors = [];
  if (req.body.password != req.body.password2) {
    errors.push({ text: "Passwords do not match" });
  }
  if (req.body.password.length < 4) {
    errors.push({ text: "Must be at lest 4 chars" });
  }
  if (errors.length > 0) {
    console.log("errors plz", JSON.stringify(errors, null, 2));
    res.render("users/register", {
      errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        console.log("user exists");
        req.flash("error_msg", "EMail already registered!");
        res.redirect("/users/register");
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash("success_msg", "You are now registerd and can login");
                res.redirect("/users/login");
              })
              .catch(err => {
                console.log(err);
                return;
              });
          });
        });
      }
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Logged out");
  res.redirect("/users/login");
});

module.exports = router;

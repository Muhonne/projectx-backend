const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { ensureAuthenticated } = require("../helpers/auth");

// ## LOAD MODELS ##
require("../models/Project");
const Project = mongoose.model("projects");

router.get("/", ensureAuthenticated, (req, res) => {
  Project.find({})
    .sort({ date: "descending" })
    .then(projects => {
      res.render("projects/index", { projects });
    });
});

router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("projects/add");
});

router.get("/edit/:id", ensureAuthenticated, (req, res) => {
  Project.findOne({ _id: req.params.id }).then(project => {
    res.render("projects/edit", { project });
  });
});

router.delete("/:id", ensureAuthenticated, (req, res) => {
  Project.remove({
    _id: req.params.id
  }).then(() => {
    req.flash("success_msg", "Project deleted");
    res.redirect("/projects");
  });
});

router.put("/:id", ensureAuthenticated, (req, res) => {
  Project.findOne({ _id: req.params.id }).then(project => {
    // update value
    project.name = req.body.name;
    project.details = req.body.details;

    project.save().then(project => {
      req.flash("success_msg", "Project updated");
      res.redirect("/");
    });
  });
});

router.post("/", ensureAuthenticated, (req, res) => {
  let errors = [];
  if (!req.body.name) errors.push({ text: "Please add title" });
  if (!req.body.details) errors.push({ text: "Please add details" });
  if (errors.length > 0) {
    res.render("/projects/add", {
      errors: errors,
      name: req.body.name,
      details: req.body.details
    });
  } else {
    const newProject = {
      name: req.body.name,
      details: req.body.details
    };
    new Project(newProject).save().then(project => {
      req.flash("success_msg", "Project added");
      res.redirect("/projects");
    });
  }
});

module.exports = router;

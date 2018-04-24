const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const Project = mongoose.model("projects");
const Technology = mongoose.model("technologies");
const Users = mongoose.model("users");

const ROUTES = {
  projects: `/projects`,
  addProject: `/projects/add`,
  deleteProject: `/projects/delete/:id`,
  technologies: `/technologies`,
  addTechnology: `/technologies/add`,
  deleteTechnology: `/technologies/delete/:id`
};

// router.use(passport.authenticate("jwt", { session: false }));
router.get(ROUTES.projects, (req, res) => {
  Project.find({})
    .sort({ date: "descending" })
    .then(projects => {
      res.status(200).json(projects);
    });
});

router.post(ROUTES.addProject, (req, res) => {
  if (!req.body.name || !req.body.details) {
    res.status(422).send({ error: "Missing name or details" });
  } else {
    const newProject = new Project({
      name: req.body.name,
      details: req.body.details,
      technologies: req.body.technologies
    });
    newProject.save().then(project => {
      res.status(200).json(project);
    });
  }
});

router.delete(ROUTES.deleteProject, (req, res) => {
  Project.remove({
    _id: req.params.id
  }).then(() => {
    res.status(200).send({ Deleted: req.params.id });
  });
});

router.get(ROUTES.technologies, (req, res) => {
  Technology.find({})
    .sort({ name: "ascending" })
    .then(projects => {
      res.status(200).json(projects);
    });
});
router.post(ROUTES.deleteTechnology, (req, res) => {
  if (!req.body.name) {
    res.status(422).send({ error: "Missing name" });
  } else {
    Technology.findOne({ name: req.body.name }).then(tech => {
      if (!tech) {
        const newTechnology = new Technology({
          name: req.body.name
        });
        newTechnology.save().then(project => {
          res.status(200).json(project);
        });
      } else {
        res.status(409).send({ error: "Tech exists" });
      }
    });
  }
});

module.exports = router;

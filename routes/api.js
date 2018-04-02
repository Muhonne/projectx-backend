const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cors = require("cors");

require("../models/Project");
const Project = mongoose.model("projects");
require("../models/Technology");
const Technology = mongoose.model("technologies");

router.get("/", cors(), (req, res) => {
  Project.find({})
    .sort({ date: "descending" })
    .then(projects => {
      res.status(200).json(projects);
    });
});

router.options("/add", cors()); // pass pre-flight
router.post("/add", cors(), (req, res) => {
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

router.options("/delete/:id", cors()); // pass pre-flight
router.delete("/delete/:id", cors(), (req, res) => {
  Project.remove({
    _id: req.params.id
  }).then(() => {
    res.status(200).send({ Deleted: req.params.id });
  });
});

router.get("/technologies", cors(), (req, res) => {
  Technology.find({})
    .sort({ name: "ascending" })
    .then(projects => {
      res.status(200).json(projects);
    });
});
router.options("/technologies/add", cors()); // pass pre-flight
router.post("/technologies/add", cors(), (req, res) => {
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

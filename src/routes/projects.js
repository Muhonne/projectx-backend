const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Project = mongoose.model("project");

router.get("/", (req, res) => {
  Project.find({})
    .sort({ date: "descending" })
    .then(projects => {
      res.status(200).json(projects);
    });
});

router.put("/", (req, res) => {
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

router.delete("/:id", (req, res) => {
  Project.remove({
    _id: req.params.id
  }).then(() => {
    res.status(200).send({ Deleted: req.params.id });
  });
});

module.exports = router;

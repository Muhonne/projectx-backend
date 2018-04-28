const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Technology = mongoose.model("technology");

router.get("/", (req, res) => {
  Technology.find({})
    .sort({ name: "ascending" })
    .then(projects => {
      res.status(200).json(projects);
    });
});

router.put("/", (req, res) => {
  console.log("Add tech", req.body);
  const newTech = new Technology({
    name: req.body.name
  });
  newTech.save().then(tech => {
    res.status(200).json(tech);
  });
});

router.delete("/:id", (req, res) => {
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
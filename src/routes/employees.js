const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Employee = mongoose.model("employee");

router.get("/", (req, res) => {
  Employee.find({})
    .sort({ name: "ascending" })
    .then(employees => {
      res.status(200).json(employees);
    });
});

router.put("/", (req, res) => {
  const newEmployee = new Employee({
    name: req.body.name,
    interests: req.body.interests,
    skills: req.body.skills
  });
  newEmployee.save().then(emp => {
    res.status(200).json(emp);
  });
});

router.delete("/:id", (req, res) => {
  Employee.remove({
    _id: req.params.id
  })
    .then(() => {
      res.status(200).send({ Deleted: req.params.id });
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `No employee found with id ${req.params.id}` });
    });
});

module.exports = router;

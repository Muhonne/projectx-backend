const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Technology = require("./Technology");

const EmployeeSkillSchema = new Schema({
  level: {
    type: Number,
    required: true
  },
  technology: Technology,
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("employeeSkill", EmployeeSkillSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSkill = require("./EmployeeSkill");

const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  interests: [EmployeeSkill],
  skills: [EmployeeSkill],
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("employee", EmployeeSchema);

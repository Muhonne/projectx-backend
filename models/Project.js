const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Technology = require("./Technology");

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  technologies: [Technology],
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("projects", ProjectSchema);

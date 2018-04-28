const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TechnologySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("technology", TechnologySchema);

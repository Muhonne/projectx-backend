const mongoose = require("mongoose");
const constants = require("../environment");

let mongoURI = constants.localMongo;
if (process.env.NODE_ENV === "production") {
  mongoURI = constants.productionMongo;
}

constants.productionMongo();
// connect to mongoose
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected to", mongoURI);
  })
  .catch(err => {
    console.log("MongoDB failed to connect!", err);
  });

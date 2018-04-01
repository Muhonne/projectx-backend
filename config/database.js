if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI:
      "mongodb://projectx:production@ds135916.mlab.com:35916/projectx-prod"
  };
} else {
  module.exports = { mongoURI: "mongodb://localhost/projectx-dev" };
}

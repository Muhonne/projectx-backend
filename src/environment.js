const axios = require("axios");

module.exports = {
  secret: "salainen jwt sala juttu",
  localMongo: "mongodb://localhost/projectx-dev",
  productionMongo: () => {
    axios
      .get("https://api.heroku.com/apps/projectx-backend/config-vars", {
        headers: {
          Accept: " application/vnd.heroku+json; version=3"
        }
      })
      .then(response => console.log("response", response))
      .catch(err => console.log("error", err));
  }
};

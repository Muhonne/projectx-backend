module.exports = {
  secret: "salainen jwt sala juttu",
  localMongo: "mongodb://localhost/projectx-dev",
  productionMongo: process.env.MONGO || 'missing from environment'
};

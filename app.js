const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
const mongoose = require("mongoose");


const app = express();

// ## GET ROUTES ##
const projects = require("./routes/projects");
const users = require("./routes/users");
const api = require("./routes/api");

const db = require("./config/database");
// connect to mongoose
mongoose
  .connect(db.mongoURI)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch(err => {
    console.log("MongoDB failed to connect!", err);
  });

// ## MIDDLEWARE ##
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// to use puts gotta method override
app.use(methodOverride("_method"));
// auth and such
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// ## STATIC FOLDERS ##
app.use(express.static(path.join(__dirname, "public")));

// ## GLOBAL VARIABLES ##
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// ## ROUTES ##
app.get("/", (req, res) => {
  const title = "Welcome";
  res.render("index", {
    title
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

// ROUTES
app.use("/projects", projects);
app.use("/users", users);
app.use("/api", api);

// PASSPORT CONFIG
require("./config/passport")(passport);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Application started at http://localhost:${port}`);
});

const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

// router.use(passport.authenticate("jwt", { session: false }));
router.use("/technologies", require("./technologies"));
router.use("/projects", require("./projects"));
router.use("/employees", require("./employees"));

module.exports = router;

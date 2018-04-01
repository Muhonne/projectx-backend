module.exports = {
  ensureAuthenticated: (req, res, next) => {
    // isAuthenticated comes from passport
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Not authorized");
    res.redirect("/users/login");
  }
};

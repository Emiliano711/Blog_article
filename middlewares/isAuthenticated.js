function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/registro");
  }
}
module.exports = isAuthenticated;

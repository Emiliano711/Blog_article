function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log("No estas logeado");
    res.redirect("/registro");
  }
}
module.exports = isAuthenticated;

const bcrypt = require("bcryptjs");
const { where } = require("sequelize");
const { User } = require("../models");
const passport = require("passport");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {
  res.render("login");
}
const login = passport.authenticate("local", {
  successRedirect: "/admin",
  failureRedirect: "/login",
});

// Show the form for creating a new resource
async function create(req, res) {
  res.render("newUser");
}

// Store a newly created resource in storage.
async function store(req, res) {
  const user = await User.findOne({ where: { email: req.body.email } });
  const isValidEmail = await bcrypt.compare(req.body.email, user.email);
  if (isValidEmail === false) {
    res.redirect("/form-user");
  } else {
    const newUser = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: await bcrypt.hash("req.body.password", 8),
    });
    console.log("se ha creado un usuario correctamente");
    return res.redirect("/admin");
  }
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
  login,
};

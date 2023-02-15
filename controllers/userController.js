const bcrypt = require("bcryptjs");
const { where } = require("sequelize");
const { User } = require("../models");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {
  res.render("registro");
}
async function login(req, res) {
  const user = await User.findOne({ where: { email: req.body.email } });

  const isValidPassword = await bcrypt.compare(req.body.pass, user.password);

  console.log(isValidPassword);

  res.render("registro");
}

// Show the form for creating a new resource
async function create(req, res) {
  res.redirect("/formUser");
}

// Store a newly created resource in storage.
async function store(req, res) {}

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

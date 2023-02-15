const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");

module.exports = async function (User) {
  const users = [];

  for (let i = 0; i < 40; i++) {
    let firstname = faker.name.firstName();
    let lastname = faker.name.lastName();
    let email = faker.internet.email(firstname, lastname);
    users.push({
      firstname,
      lastname,
      email,
      password: await bcrypt.hash("1234", 8),
    });
  }
  users.push({
    firstname: "pepe",
    lastname: "jaja",
    email: "pepe@gmail.com",
    password: await bcrypt.hash("1234", 8),
  });

  await User.bulkCreate(users);
};

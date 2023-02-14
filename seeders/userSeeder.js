const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

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

  await User.bulkCreate(users);
};

const { faker } = require("@faker-js/faker");

module.exports = async function (Author) {
  const authors = [];
  for (let i = 0; i < 40; i++) {
    authors.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  }

  await Author.bulkCreate(authors);
};

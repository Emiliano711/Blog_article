module.exports = async function (sequelize) {
    await sequelize.sync({force: true});
};
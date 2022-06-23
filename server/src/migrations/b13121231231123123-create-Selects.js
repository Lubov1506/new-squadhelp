
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('selects', {
      type: {
        primaryKey: true,
        type: Sequelize.STRING,
      },
      describe: {
        primaryKey: true,
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('selects');
  },
};

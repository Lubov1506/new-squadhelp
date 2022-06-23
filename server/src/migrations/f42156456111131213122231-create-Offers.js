const {OFFER_STATUSES} = require('../constants')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('offers', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      contestId: {
        field: 'contest_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'contests',
          key: 'id',
        },
      },
      text: {
        type: Sequelize.STRING,
      },
      fileName: {
        field: 'file_name',
        type: Sequelize.STRING,
      },
      originalFileName: {
        field: 'original_file_name',
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM(Object.values(OFFER_STATUSES)),
        defaultValue: OFFER_STATUSES.PENDING,
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
        defaultValue: new Date(),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('offers');
  },
};

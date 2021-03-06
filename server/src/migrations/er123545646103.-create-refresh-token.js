module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('refresh_tokens', {
        userId: {
            field: 'user_id',
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                email: 'users',
                key : 'id'
            }
        },
        value: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        ua: {
            type: Sequelize.STRING,
        },
        fingerprint: {
            type: Sequelize.STRING,
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('refresh_tokens');
    },
  };
  
const { CONTEST_TYPES, CONTEST_STATUSES } = require("../constants");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('contests', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contestType: {
        field: 'contest_type',
        allowNull: false,
        type: Sequelize.ENUM(...Object.values(CONTEST_TYPES)),
      },
      fileName: {
        field: 'file_name',
        type: Sequelize.STRING,
      },
      originalFileName: {
        field: 'original_file_name',
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      typeOfName: {
        field: 'type_of_name',
        type: Sequelize.STRING,
      },
      industry: {
        type: Sequelize.STRING,
      },
      focusOfWork: {
        field: 'focus_of_work',
        type: Sequelize.TEXT,
      },
      targetCustomer: {
        field: 'target_customer',
        type: Sequelize.TEXT,
      },
      styleName: {
        field: 'style_name',
        type: Sequelize.STRING,
      },
      nameVenture: {
        field: 'name_venture',
        type: Sequelize.STRING,
      },
      typeOfTagline: {
        field: 'type_of_tagline',
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM(...Object.values(CONTEST_STATUSES)),
      },
      brandStyle: {
        field: 'brand_style',
        type: Sequelize.STRING,
      },
      prize: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      priority: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      orderId: {
        field: 'order_id',
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    }).then(() =>
    queryInterface.addConstraint('contests', {
      type: 'check',
      fields: ['prize'],
      where: {
        prize: {
          [Sequelize.Op.gte]: 0,  
        }
      }
    })
  )
},
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('contests');
  },
};

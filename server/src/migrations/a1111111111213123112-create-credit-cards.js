
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('credit_cards', {
      cardNumber: {
        field: 'card_number',
        type: Sequelize.STRING,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expiry: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cvc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      balance: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
    })
      .then(() => queryInterface.addConstraint('credit_cards', {
        type: 'check',
        fields:  ['balance'],
        where: {
          balance: {
            [ Sequelize.Op.gte ]: 0,
          },
        },
      }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('credit_cards');
  },
};

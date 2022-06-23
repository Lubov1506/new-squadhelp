module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('ratings', {
        offerId: {
          field: 'offer_id',
          primaryKey: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'offers',
            key: 'id'
          }
        },
        userId: {
          field: 'user_id',
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        mark: {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0,
          validate: {
            min: 0,
            max: 5
          }
        }
      }).then(() =>
        queryInterface.addConstraint('ratings', {
          type: 'check',
          fields: ['mark'],
          where: {
            mark: {
              [Sequelize.Op.and]: [{ [Sequelize.Op.gte]: 0, }, { [Sequelize.Op.lte]: 5,}],  
            }
          }
        })
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ratings')
  }
}

const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
class Rating extends Model {

  static associate({User, Offer}) {
    Rating.belongsTo(User,
    { foreignKey: 'userId', targetKey: 'id' });
    Rating.belongsTo(Offer,
    { foreignKey: 'offerId', targetKey: 'id' });
   }}

   Rating.init({
    offerId: {
      field: 'offer_id',
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    mark: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,

    },
  }
,
  {
    sequelize,
    tableName: 'ratings',
    modelName: 'Rating',
    underscore: true,
    timestamps: false,
  });
  return Rating;
};


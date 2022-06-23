const {Model} = require('sequelize')


module.exports = (sequelize, DataTypes) => {
class Offer extends Model {

  static associate ({User, Contest, Rating}) {

    Offer.belongsTo(User,
    { foreignKey: 'userId', sourceKey: 'id' });
    Offer.belongsTo(  Contest,
    { foreignKey: 'contestId', sourceKey: 'id' });
    Offer.hasOne(  Rating,
    { foreignKey: 'offerId', targetKey: 'id' });
  
   }}

   Offer.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    contestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
    },
    fileName: {
      type: DataTypes.STRING,
    },
    originalFileName: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
  }
,
  {
    sequelize,
    tableName: 'offers',
    modelName: 'Offer',
    underscore: true,
    timestamps: false,
  });


  return Offer;
};

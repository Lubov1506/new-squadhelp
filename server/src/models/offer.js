const {Model} = require('sequelize')
const {OFFER_STATUSES} = require('../constants')

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
      field: 'user_id',
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    contestId: {
      field: 'contest_id',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
    },
    fileName: {
      field: 'file_name',
      type: DataTypes.STRING,
    },
    originalFileName: {
      field: 'original_fileName',
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM(Object.values(OFFER_STATUSES)),
      defaultValue: OFFER_STATUSES.PENDING,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      defaultValue: new Date(),
    }
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

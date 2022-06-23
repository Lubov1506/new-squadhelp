const {Model} = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
class CreditCard extends Model {

  static associate() {

   }}

   CreditCard.init({
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cvc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    }
  }
,
  {
    sequelize,
    tableName: 'credit_cards',
    modelName: 'CreditCard',
    underscore: true,
    timestamps: false,
  });


  return CreditCard;
};




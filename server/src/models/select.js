const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
class Select extends Model {

  static associate() {

   }}

   Select.init({
    type: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
    describe: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
  }
,
  {
    sequelize,
    tableName: 'selects',
    modelName: 'Select',
    underscore: true,
    timestamps: false,
  });


  return Select;
};


const {Model} = require('sequelize')
const bcrypt = require('bcrypt')
const  {SALT_ROUNDS, ROLES} = require('../constants')

async function hashPassword(user, options) {
  if (user.changed('password')) {
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hashedPassword;
  }
  }

module.exports = (sequelize, DataTypes) => {
class User extends Model {

  async comparePassword(password) {
    return bcrypt.compare(password, this.getDataValue('password'))
  }

  static associate({Offer, Contest, Rating, RefreshToken}) {
    User.hasMany(Offer,
  { foreignKey: 'userId', targetKey: 'id' });
    User.hasMany(Contest,
  { foreignKey: 'userId', targetKey: 'id' });
    User.hasMany(Rating,
  { foreignKey: 'userId', targetKey: 'id' });
  User.hasMany(RefreshToken,
    { foreignKey: 'userId'});  
  
   }}

  User.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      field: 'first_name',
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      field: 'last_name',
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      field: 'display_name',
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
/*       set(password){
        bcrypt.hash(password, SALT_ROUNDS, (err, hashedPass)=>{
          if(err) {throw err};
          this.setDataValue('password', hashedPass)
        })
      } */
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.ENUM(...Object.values(ROLES)),
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    accessToken: {
      field: 'access_token',
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: false,
  });

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword)

  return User;
};

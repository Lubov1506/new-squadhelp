const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static associate ({ User }) {
      RefreshToken.belongsTo(User, { foreignKey: 'userId' })
    }
  }

  RefreshToken.init(
    {
      userId: {
        field: 'user_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          email: 'users',
          key: 'id'
        }
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      ua: {
        type: DataTypes.STRING
      },
      fingerprint: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      tableName: 'refresh_tokens',
      modelName: 'RefreshToken',
      underscore: true,
      timestamps: false
    }
  )

  return RefreshToken
}

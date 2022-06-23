const { Model } = require('sequelize')
const {CONTEST_TYPES, CONTEST_STATUSES} = require('../constants')

module.exports = (sequelize, DataTypes) => {
  class Contest extends Model {

    static associate ({User, Offer}) {
      Contest.belongsTo(User,
      { foreignKey: 'userId', sourceKey: 'id' });
      Contest.hasMany(Offer,
      { foreignKey: 'contestId', targetKey: 'id' });
    }
  }
  Contest.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      orderId: {
        field: 'order_id',
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      contestType: {
        field: 'contest_type',
        allowNull: false,
        type: DataTypes.ENUM(...Object.values(CONTEST_TYPES)),
      },
      fileName: {
        field: 'file_name',
        type: DataTypes.STRING,
      },
      originalFileName: {
        field: 'original_file_name',
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
      },
      typeOfName: {
        field: 'type_of_name',
        type: DataTypes.STRING,
      },
      industry: {
        type: DataTypes.STRING,
      },
      focusOfWork: {
        field: 'focus_of_work',
        type: DataTypes.TEXT,
      },
      targetCustomer: {
        field: 'target_customer',
        type: DataTypes.TEXT,
      },
      styleName: {
        field: 'style_name',
        type: DataTypes.STRING,
      },
      nameVenture: {
        field: 'name_venture',
        type: DataTypes.STRING,
      },
      typeOfTagline: {
        field: 'type_of_tagline',
        type: DataTypes.STRING,
      },
      brandStyle: {
        field: 'brand_style',
        type: DataTypes.STRING,
      },
      createdAt: {
        field: 'created_at',
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM(...Object.values(CONTEST_STATUSES)),
        allowNull: false,
      },
      prize: {
        allowNull: false,
        type: DataTypes.DECIMAL,
        validate: {
          min: 0
        }
      },
      priority: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          min: 0
        }
      },
    },
    
    {
      sequelize,
      modelName: 'Contest',
      tableName: 'contests',
      underscored: true,
      timestamps: false,
    }
  );
  return Contest
};
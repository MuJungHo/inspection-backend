'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Point extends Model {
    static associate(models) {
      Point.hasMany(models.Item, {
        foreignKey: 'pointId',
        as: 'items',
        onDelete: 'CASCADE'
      });

      Point.belongsToMany(models.Plan, {
        through: 'plan_points',
        foreignKey: 'pointId',
        otherKey: 'planId',
        as: 'plans'
      });
    }
  }

  Point.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '點位名稱 (如: A區冰水主機)'
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      comment: '識別碼 (QR Code/NFC Tag ID)'
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
      comment: '緯度'
    },
    longitude: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
      comment: '經度'
    },
    description: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active'
    }
  }, {
    sequelize,
    modelName: 'Point',
    tableName: 'points',
    underscored: true,
    timestamps: true
  });

  return Point;
};
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(models.Point, {
        foreignKey: 'pointId',
        as: 'point'
      });
    }
  }

  Item.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      comment: '檢查項目名稱'
    },
    dataType: {
      type: DataTypes.STRING(20),
      field: 'data_type',
      allowNull: false,
      comment: '資料類型 (boolean, numeric, text...)'
    },
    isReportable: {
      type: DataTypes.BOOLEAN,
      field: 'is_reportable',
      defaultValue: true,
      comment: '是否需要回報異常'
    },
    options: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    // 數值型檢查的標準值或上限 (選用)
    numerical: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // 運算符號 (如: '>', '<', '=', 'range')
    operator: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'items',
    timestamps: true,
    underscored: true
  });

  return Item;
};
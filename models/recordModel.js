'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * 定義關聯
     */
    static associate(models) {

      Record.belongsTo(models.Task, {
        foreignKey: 'taskId',
        as: 'task'
      });

      Record.belongsTo(models.Point, {
        foreignKey: 'pointId',
        as: 'point'
      });

      Record.belongsTo(models.Item, {
        foreignKey: 'itemId',
        as: 'item'
      });

      Record.belongsTo(models.User, {
        foreignKey: 'inspectorId',
        as: 'inspector'
      });
    }
  }

  Record.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'task_id',
      references: {
        model: 'tasks',
        key: 'id'
      },
      comment: '所屬巡檢任務ID'
    },
    pointId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'point_id',
      references: {
        model: 'points',
        key: 'id'
      },
      comment: '所屬巡檢點位ID'
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'item_id',
      references: {
        model: 'items',
        key: 'id'
      },
      comment: '對應的檢查項目ID'
    },
    inspectorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'inspector_id',
      references: {
        model: 'users',
        key: 'id'
      },
      comment: '對應的巡檢員'
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '檢查值 (字串/數值/布林皆轉文字存)'
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: 'DEFAULT',
      comment: '檢查狀態 (DEFAULT/PASS/FAIL)'
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '備註/缺失描述/圖片連結'
    },
    completedAt: {
      type: DataTypes.DATE,
      field: 'completed_at',
      defaultValue: DataTypes.NOW,
      comment: '實際檢查時間'
    }
  }, {
    sequelize,
    modelName: 'Record',
    tableName: 'records',
    underscored: true,
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['task_id', 'point_id', 'item_id']
      }
    ]
  });

  return Record;
};
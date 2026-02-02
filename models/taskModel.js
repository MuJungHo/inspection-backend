'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.Plan, {
        foreignKey: 'planId',
        as: 'plan'
      });
      Task.belongsTo(models.User, {
        foreignKey: 'inspectorId',
        as: 'inspector'
      });
    }
  }

  Task.init({
    status: DataTypes.ENUM('TODO', 'COMPLETED'),
    scheduledAt: {
      type: DataTypes.DATEONLY,
      field: 'scheduled_at',
      allowNull: false
    },
    inspectorId: {
      type: DataTypes.INTEGER,
      field: 'inspector_id'
    }
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    underscored: true
  });

  return Task;
};
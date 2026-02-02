'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Plan.belongsToMany(models.Point, {
        through: 'plan_points',
        foreignKey: 'planId',
        otherKey: 'pointId',
        as: 'points'
      });
    }
  }

  Plan.init({
    name: DataTypes.STRING,
    frequency: {
      type: DataTypes.ENUM('ONCE', 'DAILY', 'WEEKLY'),
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      field: 'start_date',
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      field: 'end_date',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Plan',
    tableName: 'plans',
    underscored: true
  });

  return Plan;
};
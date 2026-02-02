const { Task, Plan, Point, Item } = require('../../models');
const { Op } = require('sequelize');

class TaskRepository {
  constructor() {
  }
  async findTasksByInspectorAndDateRange(inspectorId, startDate, endDate) {
    return await Task.findAll({
      where: {
        inspectorId: inspectorId,
        scheduledAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate
        }
      },
      include: [
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'name', 'frequency'],
          include: [
            {
              model: Point,
              as: 'points',
              through: { attributes: [] }, // ✨ 隱藏中間表 (plan_points) 的雜訊
              include: [
                {
                  model: Item,
                  as: 'items',
                  required: false
                }
              ]
            }
          ]
        }
      ],
      order: [
        ['status', 'DESC'],
        ['scheduledAt', 'ASC']
      ],
    });
  }
}

module.exports = TaskRepository
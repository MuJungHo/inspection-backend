const { Task, Plan, Point, Item, Record, User } = require('../../models');
const { Op } = require('sequelize');

class TaskRepository {
  constructor() {
  }
  async findByIdRepository(id) {
    return await Task.findByPk(id, {
      include: [
        {
          model: User,
          as: 'inspector',
          attributes: ['id', 'username', 'email']
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'name', 'frequency'],
          include: [
            {
              model: Point,
              as: 'points',
              through: { attributes: [] },
              include: [
                {
                  model: Item,
                  as: 'items'
                }
              ]
            }
          ]
        },
        {
          model: Record,
          as: 'records'
        },
      ]
    });
  }

  async findAllRepository(where = {}) {
    return await Task.findAll({
      where,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Record,
          as: 'records',
        },
        {
          model: User,
          as: 'inspector',
          attributes: ['id', 'username', 'email']
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'name', 'frequency'],
          include: [
            {
              model: Point,
              as: 'points',
              through: { attributes: [] },
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
      ]
    });
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
              through: { attributes: [] },
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
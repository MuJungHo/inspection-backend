const { Plan, Result, Item, User, Point, sequelize } = require('../../models');

class PlanRepository {

  async createRepository(planData, pointIds) {
    const t = await sequelize.transaction();

    try {
      const plan = await Plan.create(planData, { transaction: t });

      if (pointIds && pointIds.length > 0) {
        await plan.setPoints(pointIds, { transaction: t });
      }

      await t.commit();

      return await this.findByIdRepository(plan.id);

    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
  async findAllRepository() {
    return await Plan.findAll({
      order: [['createdAt', 'DESC']],
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
        },
      ]
    });
  }

  async findByIdRepository(id) {
    return await Plan.findByPk(id, {
      include: [{ model: Point, as: 'points', through: { attributes: [] } }]
    });
  }

}

module.exports = PlanRepository;
const { Plan, Result, Item, User, Point } = require('../../models');

class PointRepository {

  async createRepository(data) {

    const point = await Point.create(data);

    return await this.findByIdRepository(point.id);
  }

  async findAllRepository() {
    return await Point.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        { model: Item, as: 'items' },
        { model: Plan, as: 'plans' },
      ]
    });
  }

  async findByIdRepository(id) {
    return await Point.findByPk(id, {
      include: [{ model: Item, as: 'items' }]
    });
  }
}

module.exports = PointRepository;
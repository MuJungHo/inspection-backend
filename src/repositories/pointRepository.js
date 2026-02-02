const { Plan, Result, Item, User, Point } = require('../../models');

class PointRepository {

  async createRepository(data, itemIds) {
    const point = await Point.create(data);

    if (itemIds && itemIds.length > 0) {
      await point.setItems(itemIds);
    }

    return await this.findByIdRepository(point.id);
  }

  async findAllRepository() {
    return await Point.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        { model: Item, as: 'items' },
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
const { Item } = require('../../models');

class ItemRepository {
  constructor() {

  }

  async createRepository(data) {
    return await Item.create(data);
  }

  async findByNameRepository(name) {
    return await Item.findOne({ where: { name } });
  }

  async findAllItemByPointId(pointId) {
    return await Item.findAll({
      where: { pointId },
      order: [['createdAt', 'DESC']]
    });
  }

  async findByIdRepository(id) {
    return await Item.findByPk(id);
  }

  async findAllRepository() {
    return await Item.findAll({
      order: [['createdAt', 'DESC']]
    });
  }

  async updateRepository(id, data) {

    const [affectedCount] = await Item.update(data, {
      where: { id }
    });

    if (affectedCount > 0) {
      return await Item.findByPk(id);
    }
    return null;
  }

  async deleteRepository(id) {
    return await Item.destroy({ where: { id: id } });
  }
}

module.exports = ItemRepository;
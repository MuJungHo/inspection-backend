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
      return await this.findById(id);
    }
    return null;
  }
}

module.exports = ItemRepository;
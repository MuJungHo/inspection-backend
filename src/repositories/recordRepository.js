const { Plan, Record, Item, User } = require('../../models');

class RecordRepository {

  async createRepository(data) {

    const point = await Record.create(data);

    return await this.findByIdRepository(point.id);
  }

  async findByIdRepository(id) {
    return await Record.findByPk(id);
  }

  async findAllRecordRepository(where = {}) {
    return await Record.findAll({
      where,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'inspector',
          attributes: ['id', 'username', 'email']
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'name']
        },
        {
          model: Item,
          as: 'item',
          attributes: ['id', 'name']
        },
      ]
    });
  }
}

module.exports = RecordRepository;
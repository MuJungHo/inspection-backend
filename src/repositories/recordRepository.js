const { Plan, Record, Item, User, Task } = require('../../models');

class RecordRepository {

  async createRepository(data) {

    const point = await Record.create(data);

    return await this.findByIdRepository(point.id);
  }

  async findByIdRepository(id) {
    return await Record.findByPk(id);
  }

  async bulkUpsertRecords(recordsData, transaction) {
    return await Record.bulkCreate(recordsData, {
      updateOnDuplicate: ['value', 'status', 'comment', 'completed_at', 'updated_at'],
      transaction: transaction
    });
  }

  async updateTaskStatus(taskId, status, transaction) {
    const result = await Task.update(
      { status: status },
      {
        where: { id: taskId },
        transaction: transaction
      }
    );
    return result
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
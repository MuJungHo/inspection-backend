const { Plan, Result, Item, User } = require('../../models');

class ResultRepository {

  async bulkCreateReultRepository(rowsToSave) {
    return await Result.bulkCreate(rowsToSave, {
      updateOnDuplicate: ['value', 'status', 'comment', 'completedAt', 'updatedAt']
    })
  }

  async findAllResultRepository() {
    return await Result.findAll({
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

module.exports = ResultRepository;
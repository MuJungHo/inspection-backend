const { sequelize, Record, Item } = require('../../models');
const { evaluateRecordStatus } = require('../utils/evaluation.util');

class RecordService {
  constructor(repo) {
    this.repo = repo;
  }

  async createService(data) {
    return await this.repo.createRepository(data);
  }


  async getAllRecordService() {
    return await this.repo.findAllRecordRepository();
  }

  async processAndSaveRecords(taskId, planId, inspectorId, records) {
    const itemIds = records.map(r => r.itemId);
    const items = await Item.findAll({ where: { id: itemIds } });
    const itemMap = {};
    items.forEach(i => itemMap[i.id] = i);

    const recordsToInsert = records.map(item => {
      const currentItem = itemMap[item.itemId];
      // console.log(item)
      const status = evaluateRecordStatus(currentItem, item.value);
      return {
        planId: planId,
        taskId: taskId,
        pointId: item.pointId,
        itemId: item.itemId,
        inspectorId: inspectorId,
        value: String(item.value),
        status: status,
        comment: item.comment || null,
        completedAt: new Date()
      }
    }
    );

    return await sequelize.transaction(async (t) => {
      await this.repo.bulkUpsertRecords(recordsToInsert, t);
      await this.repo.updateTaskStatus(taskId, 'COMPLETED', t);
    });
  };
}

module.exports = RecordService;
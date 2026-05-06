'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const records = [];
      const statuses = ['PASS', 'PASS', 'PASS', 'PASS', 'PASS', 'PASS', 'PASS', 'PASS', 'FAIL', 'DEFAULT'];
      const points = [
        [1], [2], [3, 4], [5, 6], [7, 8], [9, 10]
      ];
      for (const [i, items] of points.entries()) {
        for (const [j, item] of items.entries()) {
          for (let k = 0; k < 49; k++) {
            records.push({
              task_id: k + 1,
              item_id: item,
              point_id: i + 1,
              inspector_id: 1,
              value: Math.floor(Math.random() * 100).toString(),
              status: statuses[Math.floor(Math.random() * statuses.length)],

              created_at: new Date(new Date() - Math.random() * 30 * 24 * 60 * 60 * 1000),
              updated_at: new Date()
            });
          }
        }
      }

      await queryInterface.bulkInsert('records', records, { transaction });

      await transaction.commit();

    } catch (error) {
      await transaction.rollback();
      console.error('❌ 大量 Record Seeder 執行失敗:', error.message);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

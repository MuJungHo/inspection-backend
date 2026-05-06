'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const records = [];
      const statuses = ['PASS', 'PASS', 'PASS', 'PASS', 'PASS', 'PASS', 'PASS', 'PASS', 'FAIL', 'DEFAULT'];

      const [plans] = await queryInterface.sequelize.query('SELECT id FROM plans');
      const [tasks] = await queryInterface.sequelize.query('SELECT id, inspector_id FROM tasks');
      const [users] = await queryInterface.sequelize.query('SELECT id FROM users');

      for (let t = 0; t < tasks.length; t++) {
        const [items] = await queryInterface.sequelize.query(`
          SELECT t.id AS task_id, p.id AS point_id, i.id AS item_id, t.plan_id AS plan_id
          FROM tasks t
          JOIN plan_points pp ON t.plan_id = pp.plan_id 
          JOIN points p ON pp.point_id = p.id 
          JOIN items i ON p.id = i.point_id
          WHERE t.id = ${tasks[t].id};
        `);
        for (let i = 0; i < items.length; i++) {
          records.push({
            plan_id: items[i].plan_id,
            task_id: items[i].task_id,
            item_id: items[i].item_id,
            point_id: items[i].point_id,
            inspector_id: tasks[t].inspector_id,
            value: Math.floor(Math.random() * 100).toString(),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            created_at: new Date(new Date() - Math.random() * 30 * 24 * 60 * 60 * 1000),
            updated_at: new Date()
          });
        }
      }

      // for (let u = 0; t < users.length; u++) {

      // }
      // for (let i = 0; t < items.length; i++) {

      // }


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

'use strict';
const dayjs = require('dayjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      let tasks = [];

      const [users] = await queryInterface.sequelize.query('SELECT id FROM users ORDER BY id ASC;');
      const [plans] = await queryInterface.sequelize.query('SELECT id FROM plans ORDER BY id ASC;');
      for (let u = 0; u < users.length; u++) {
        for (let p = 0; p < plans.length; p++) {
          for (let i = 0; i < 60; i++) {
            tasks.push({
              plan_id: plans[p].id,
              scheduled_at: dayjs('2026-05-04').add(i + 1, 'day').toDate(),
              status: dayjs('2026-05-04').add(i + 1, 'day').isBefore(dayjs()) ? 'COMPLETED' : 'TODO',
              inspector_id: users[u].id,
              created_at: new Date(),
              updated_at: new Date()
            })
          }
        }
      }

      await queryInterface.bulkInsert('tasks', tasks, { transaction });

      await transaction.commit();

    } catch (error) {
      await transaction.rollback();
      console.error('Seeder Error:', error);
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

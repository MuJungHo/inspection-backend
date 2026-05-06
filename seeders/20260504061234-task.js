'use strict';
const dayjs = require('dayjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      let compeletedTasks = [];
      let dayTasks = [];
      let weekTasks = [];
      for (let i = 0; i < 15; i++) {
        compeletedTasks.push({
          plan_id: 1,
          scheduled_at: dayjs('2026-4-01').add(i + 1, 'day').toDate(),
          status: 'COMPLETED',
          inspector_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        })
      }
      for (let i = 0; i < 30; i++) {
        dayTasks.push({
          plan_id: 1,
          scheduled_at: dayjs('2026-05-04').add(i + 1, 'day').toDate(),
          status: 'TODO',
          inspector_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        })
      }

      for (let i = 0; i < 4; i++) {
        weekTasks.push({
          plan_id: 2,
          scheduled_at: dayjs('2026-05-04').add((i + 1) * 7, 'day').toDate(),
          status: 'TODO',
          inspector_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        })
      }

      await queryInterface.bulkInsert('tasks', [
        ...compeletedTasks, ...dayTasks, ...weekTasks
      ], { transaction });

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

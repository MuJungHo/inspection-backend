'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert('plans', [
        {
          name: '陽光每日巡檢',
          frequency: 'DAILY',
          start_date: '2026-02-01',
          end_date: '2026-02-28',
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction });

      const plans = await queryInterface.sequelize.query(
        `SELECT id FROM plans WHERE name = '陽光每日巡檢' LIMIT 1;`,
        { 
          type: queryInterface.sequelize.QueryTypes.SELECT,
          transaction 
        }
      );

      const planId = plans[0]?.id;

      if (planId) {
        await queryInterface.bulkInsert('plan_points', [
          {
            plan_id: planId,
            point_id: 1,
            created_at: new Date(),
            updated_at: new Date()
          }
        ], { transaction });
      }

      await transaction.commit();

    } catch (error) {
      await transaction.rollback();
      console.error('Seeder Error:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('plans', null, {});
  }
};
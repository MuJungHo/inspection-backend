'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert('plans', [
        {
          name: '瑞光每週巡檢',
          frequency: 'WEEKLY',
          start_date: '2026-05-04',
          end_date: '2026-05-28',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: '陽光每日巡檢',
          frequency: 'DAILY',
          start_date: '2026-05-04',
          end_date: '2026-05-28',
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction });


      await queryInterface.bulkInsert('plan_points', [
        {
          plan_id: 1,
          point_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 1,
          point_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 1,
          point_id: 3,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 2,
          point_id: 4,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 2,
          point_id: 5,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          plan_id: 2,
          point_id: 6,
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction });

      await transaction.commit();

    } catch (error) {
      await transaction.rollback();
      console.error('Seeder Error:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // 1. 先找出我們要刪除的計畫 ID
      const plans = await queryInterface.sequelize.query(
        `SELECT id FROM plans WHERE name = '陽光每日巡檢' LIMIT 1;`,
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
          transaction
        }
      );

      const planId = plans[0]?.id;

      if (planId) {
        // 2. 先刪除關聯表 (plan_points) 中的紀錄，避免外鍵衝突
        await queryInterface.bulkDelete('plan_points', { plan_id: planId }, { transaction });

        // 3. 再刪除計畫 (plans) 本身
        await queryInterface.bulkDelete('plans', { id: planId }, { transaction });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
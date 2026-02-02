'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      const pointId = 1;

      await queryInterface.bulkInsert('points', [
        {
          id: pointId,
          name: '陽光發電機室',
          code: 'GEN-B1-001',
          latitude: 25.000, 
          longitude: 121.000,
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction });

      await queryInterface.sequelize.query(
        `UPDATE "items" 
         SET "point_id" = :pointId, "updated_at" = NOW() 
         WHERE "id" IN (:itemIds)`,
        {
          replacements: { 
            pointId: pointId, 
            itemIds: [1, 2, 3, 4] 
          },
          transaction
        }
      );

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
      const pointId = 1;
      const itemIds = [1, 2, 3, 4];

      await queryInterface.sequelize.query(
        `UPDATE "items" 
         SET "point_id" = NULL 
         WHERE "id" IN (:itemIds) AND "point_id" = :pointId`,
        {
          replacements: { itemIds: itemIds, pointId: pointId },
          transaction
        }
      );

      await queryInterface.bulkDelete('points', { id: pointId }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
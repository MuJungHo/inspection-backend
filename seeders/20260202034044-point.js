'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert('points', [
        {
          id: 1,
          name: '陽光發電機室',
          code: 'GEN-B1-001',
          latitude: 25.000,
          longitude: 121.000,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          name: '陽光一樓大廳',
          code: 'LOBBY-1F-001',
          latitude: 25.001,
          longitude: 121.001,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 3,
          name: '陽光地下停車場',
          code: 'PARKING-B2-001',
          latitude: 25.002,
          longitude: 121.002,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 4,
          name: '瑞光發電機室',
          code: 'GEN-B1-002',
          latitude: 25.003,
          longitude: 121.003,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 5,
          name: '瑞光一樓大廳',
          code: 'LOBBY-1F-002',
          latitude: 25.002,
          longitude: 121.002,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 6,
          name: '瑞光地下停車場',
          code: 'PARKING-B2-002',
          latitude: 25.004,
          longitude: 121.004,
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
            pointId: 1,
            itemIds: [1]
          },
          transaction
        }
      );

      await queryInterface.sequelize.query(
        `UPDATE "items" 
         SET "point_id" = :pointId, "updated_at" = NOW() 
         WHERE "id" IN (:itemIds)`,
        {
          replacements: {
            pointId: 2,
            itemIds: [2]
          },
          transaction
        }
      );

      await queryInterface.sequelize.query(
        `UPDATE "items" 
         SET "point_id" = :pointId, "updated_at" = NOW() 
         WHERE "id" IN (:itemIds)`,
        {
          replacements: {
            pointId: 3,
            itemIds: [3, 4]
          },
          transaction
        }
      );

      await queryInterface.sequelize.query(
        `UPDATE "items" 
         SET "point_id" = :pointId, "updated_at" = NOW() 
         WHERE "id" IN (:itemIds)`,
        {
          replacements: {
            pointId: 4,
            itemIds: [5, 6]
          },
          transaction
        }
      );

      await queryInterface.sequelize.query(
        `UPDATE "items" 
         SET "point_id" = :pointId, "updated_at" = NOW() 
         WHERE "id" IN (:itemIds)`,
        {
          replacements: {
            pointId: 5,
            itemIds: [7, 8]
          },
          transaction
        }
      );
      await queryInterface.sequelize.query(
        `UPDATE "items" 
         SET "point_id" = :pointId, "updated_at" = NOW() 
         WHERE "id" IN (:itemIds)`,
        {
          replacements: {
            pointId: 6,
            itemIds: [9, 10]
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
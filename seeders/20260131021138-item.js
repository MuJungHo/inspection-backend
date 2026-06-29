'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [points] = await queryInterface.sequelize.query('SELECT id FROM points ORDER BY id ASC;');
    const items = [
      {
        name: '滅火器壓力檢查',
        data_type: 'numeric',
        numerical: 90,
        operator: ">",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '機台狀態檢查',
        data_type: 'multiple',
        options: JSON.stringify([
          {
            label: 'name1', is_answer: true
          },
          {
            label: 'name2', is_answer: false
          },
          {
            label: 'name3', is_answer: false
          },
        ]),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '備注',
        data_type: 'text',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]
    let result = [];
    for (let p = 0; p < points.length; p++) {
      for (let i = 0; i < items.length; i++) {
        result.push({
          ...items[i],
          point_id: points[p].id
        })
      }
    }
    await queryInterface.bulkInsert('items', result);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('items', null, {});
  }
};
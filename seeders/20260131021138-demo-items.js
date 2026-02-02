'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('items', [
      {
        name: '滅火器壓力檢查',
        data_type: 'numeric',
        numerical: 90,
        operator: ">",
        is_reportable: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '安全門是否暢通',
        data_type: 'boolean',
        is_reportable: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '機台狀態檢查',
        data_type: 'multiple',
        is_reportable: true,
        options: JSON.stringify([
          {
            name: 'name1', label: [
              { lang: 'en', text: 'normal' },
              { lang: 'zh-TW', text: '正常' },
            ], is_correct: 1
          },
          {
            name: 'name2', label: [
              { lang: 'en', text: 'damage' },
              { lang: 'zh-TW', text: '毀損' },
            ], is_correct: 0
          },
          {
            name: 'name3', label: [
              { lang: 'en', text: 'fixed' },
              { lang: 'zh-TW', text: '已修復' },
            ], is_correct: 0
          },
        ]),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '備注',
        data_type: 'text',
        is_reportable: false,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('items', null, {});
  }
};
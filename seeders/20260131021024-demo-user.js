'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);

    const usersData = [
      {
        username: 'Demo Inspector',
        email: 'inspector@example.com',
        password: hashedPassword,
        role: 'inspector',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'Demo Operator',
        email: 'operator@example.com',
        password: hashedPassword,
        role: 'operator',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    
    for (const user of usersData) {
      const existingUser = await queryInterface.rawSelect('users', {
        where: { email: user.email },
      }, ['id']);

      if (!existingUser) {
        await queryInterface.bulkInsert('users', [user]);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', {
      email: ['inspector@example.com', 'operator@example.com']
    }, {});
  }
};
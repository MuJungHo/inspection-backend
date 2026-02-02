const { Sequelize } = require('sequelize');
require('dotenv').config(); // 載入環境變數

// 建立 Sequelize 實例
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,

    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000 
    },

    // logging: console.log, // 開發模式下可以開啟，看到 SQL 語句
    logging: true,
    
  }
);

module.exports = sequelize;
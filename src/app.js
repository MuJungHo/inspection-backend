const express = require('express');
const cors = require('cors')
const app = express();
const { sequelize } = require('../models');
const authMiddleware = require('./middlewares/authMiddleware');
const AuthRoutes = require('./routes/authRoutes');
const UserRoutes = require('./routes/userRoutes');
const ItemRoutes = require('./routes/itemRoutes');
const PlanRoutes = require('./routes/planRoutes');
const RecordRoutes = require('./routes/recordRoutes');
const PointRoutes = require('./routes/pointRoutes');
const TaskRoutes = require('./routes/TaskRoutes');

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', AuthRoutes);

app.use(authMiddleware);

app.use('/api/user', UserRoutes);
app.use('/api/item', ItemRoutes);
app.use('/api/plan', PlanRoutes);
app.use('/api/record', RecordRoutes);
app.use('/api/point', PointRoutes);
app.use('/api/task', TaskRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
  });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');

    // await sequelize.sync({ force: true });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
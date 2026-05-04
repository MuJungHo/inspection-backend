const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

class TaskService {

  constructor(repo) {
    this.repo = repo;
  }

  async getTodayTasksByUser(userId) {
    const TIMEZONE = 'Asia/Taipei';
    const startOfDay = dayjs().tz(TIMEZONE).startOf('day').toDate();
    const endOfDay = dayjs().tz(TIMEZONE).endOf('day').toDate();

    const tasks = await this.repo.findTasksByInspectorAndDateRange(
      userId,
      startOfDay,
      endOfDay
    );
    return tasks;
  }

  async getTaskDetailService(id) {
    const task = await this.repo.findByIdRepository(id);
    if (!task) throw new Error('task not found');
    return task;
  }

  async getAllService(where = {}) {
    return await this.repo.findAllRepository(where);
  }
}

module.exports = TaskService
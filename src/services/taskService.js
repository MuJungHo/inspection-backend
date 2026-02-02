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
    // 1. 設定時區 (確保這裡是台灣時間)
    const TIMEZONE = 'Asia/Taipei';
    
    // 2. 計算今天的起始與結束
    // 例如：2026-02-05 00:00:00 ~ 2026-02-05 23:59:59
    const startOfDay = dayjs().tz(TIMEZONE).startOf('day').toDate();
    const endOfDay = dayjs().tz(TIMEZONE).endOf('day').toDate();

    console.log(`[TaskService] 查詢範圍: ${startOfDay} ~ ${endOfDay}`);

    const tasks = await this.repo.findTasksByInspectorAndDateRange(
      userId, 
      startOfDay, 
      endOfDay
    );
    return tasks;
  }
}

module.exports = TaskService
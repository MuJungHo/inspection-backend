const { Record, Item, Point, Task, Plan, sequelize } = require('../../models');

class DashboardController {

  async getPointPassRateRanking(req, res, next) {
    try {
      const stats = await Record.findAll({
        attributes: [
          'pointId',
          [sequelize.fn('COUNT', sequelize.col('Record.id')), 'totalRecords'],
          [sequelize.fn('SUM', sequelize.literal(`CASE WHEN status = 'FAIL' THEN 1 ELSE 0 END`)), 'failedCount']
        ],
        include: [
          {
            model: Point,
            as: 'point',
            attributes: ['name']
          }
        ],
        group: ['Record.point_id', 'point.id'],
        raw: true
      });

      const ranking = stats.map(stat => {
        const total = parseInt(stat.totalRecords || 0, 10);
        const failed = parseInt(stat.failedCount || 0, 10);
        const failRate = total > 0 ? parseFloat(((failed / total) * 100).toFixed(2)) : 0;

        return {
          pointId: stat.pointId,
          pointName: stat['point.name'] || '未知點位',
          totalRecords: total,
          failedCount: failed,
          failRate: failRate
        };
      });

      // ranking.sort((a, b) => b.failedCount - a.failedCount);

      const top5WorstPoints = ranking.slice(0, 5);

      res.json({
        success: true,
        data: top5WorstPoints
      });

    } catch (error) {
      console.error('取得點位排名失敗:', error);
      res.status(500).json({ success: false, message: '伺服器內部錯誤' });
    }
  }
  async getItemPassRateRanking(req, res, next) {
    try {
      const stats = await Record.findAll({
        attributes: [
          'itemId',
          [sequelize.fn('COUNT', sequelize.col('Record.id')), 'totalRecords'],
          [sequelize.fn('SUM', sequelize.literal(`CASE WHEN status = 'PASS' THEN 1 ELSE 0 END`)), 'passedCount']
        ],
        include: [
          {
            model: Item,
            as: 'item',
            attributes: ['name']
          }
        ],
        group: ['Record.item_id', 'item.id'],
        raw: true
      });

      const ranking = stats.map(stat => {
        const total = parseInt(stat.totalRecords || 0, 10);
        const passed = parseInt(stat.passedCount || 0, 10);
        const passRate = total > 0 ? parseFloat(((passed / total) * 100).toFixed(2)) : 0;

        return {
          itemId: stat.itemId,
          itemName: stat['item.name'] || '未知項目',
          totalRecords: total,
          passedCount: passed,
          failedCount: total - passed,
          passRate: passRate
        };
      });

      ranking.sort((a, b) => a.passRate - b.passRate);

      const top10Worst = ranking.slice(0, 10);

      res.json({
        success: true,
        data: top10Worst
      });

    } catch (error) {
      console.error('取得排名失敗:', error);
      res.status(500).json({ success: false, message: '伺服器內部錯誤' });
    }
  }
  async getPlanPassRateRanking(req, res, next) {
    try {
      const records = await Record.findAll({
        attributes: ['status'],
        include: [
          {
            model: Task,
            as: 'task',
            attributes: ['planId'],
            include: [
              {
                model: Plan,
                as: 'plan',
                attributes: ['name']
              }
            ]
          }
        ],
        raw: true,
        nest: true
      });

      const planStatsMap = {};
      
      records.forEach(record => {
        const planId = record.task?.planId;
        const planName = record.task?.plan?.name || '未分類計畫';

        if (!planId) return;

        if (!planStatsMap[planId]) {
          planStatsMap[planId] = {
            planId,
            planName,
            totalRecords: 0,
            passedCount: 0,
            failedCount: 0
          };
        }

        planStatsMap[planId].totalRecords += 1;

        if (record.status === 'FAIL') {
          planStatsMap[planId].failedCount += 1;
        } else if (record.status === 'PASS' || record.status === 'NORMAL') {
          planStatsMap[planId].passedCount += 1;
        }
      });

      const ranking = Object.values(planStatsMap).map(stat => {
        const failRate = stat.totalRecords > 0
          ? parseFloat(((stat.failedCount / stat.totalRecords) * 100).toFixed(2))
          : 0;

        return {
          ...stat,
          failRate
        };
      });


      res.json({
        success: true,
        data: ranking
      });

    } catch (error) {
      console.error('取得計畫排名失敗:', error);
      res.status(500).json({ success: false, message: '伺服器內部錯誤' });
    }
  }
  async getRecordStatus(req, res, next) {
    try {
      const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date();
      const startDate = req.query.startDate 
        ? new Date(req.query.startDate) 
        : new Date(new Date().setDate(endDate.getDate() - 30));

      const statusCounts = await Record.findAll({
        attributes: [
          'status',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        where: {
          // createdAt: {
          //   [Op.between]: [startDate, endDate]
          // }
        },
        group: ['status'],
        raw: true
      });

      let total = 0;
      const distribution = statusCounts.map(item => {
        const count = parseInt(item.count, 10);
        total += count;
        return {
          status: item.status,
          count: count
        };
      });

      const formattedData = distribution.map(item => ({
        ...item,
        percentage: total > 0 ? parseFloat(((item.count / total) * 100).toFixed(2)) : 0
      }));

      res.json({
        success: true,
        data: {
          totalRecords: total,
          details: formattedData
        }
      });

    } catch (error) {
      console.error('取得狀態分佈失敗:', error);
      res.status(500).json({ success: false, message: '伺服器內部錯誤' });
    }
  }
}

module.exports = new DashboardController();
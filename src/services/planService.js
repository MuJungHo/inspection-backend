const { Plan, Task, sequelize } = require('../../models');
const { Op } = require('sequelize');
const dayjs = require('dayjs');

class PlanService {
  constructor(repo) {
    this.repo = repo;
  }

  async createPlanService(data) {

    const { pointIds } = data;

    return await this.repo.createRepository(data, pointIds);

  }

  async assignInspectorService(data) {

    const { planId: id, inspectorId } = data;

    const plan = await Plan.findByPk(id);

    return await this.generateTasksForPlanHelper(plan, inspectorId);
  }

  async generateTasksForPlanHelper(plan, inspectorId) {
    const tasksData = [];

    const today = dayjs().startOf('day');
    let current = dayjs(plan.startDate);

    if (current.isBefore(today)) {
      current = today;
    }

    const end = dayjs(plan.endDate);
    console.log(plan)

    while (current.isBefore(end) || current.isSame(end)) {
      let shouldCreate = false;

      if (plan.frequency === 'DAILY') shouldCreate = true;
      else if (plan.frequency === 'WEEKLY' && current.day() === dayjs(plan.startDate).day()) shouldCreate = true;

      if (shouldCreate) {
        tasksData.push({
          planId: plan.id,
          title: `${plan.name} - ${current.format('YYYY-MM-DD')}`,
          scheduledAt: current.toDate(),
          status: 'TODO',
          inspectorId
        });
      }
      current = current.add(1, 'day');
    }

    return await Task.bulkCreate(tasksData);
  }

  async getAllPlansService() {
    return await this.repo.findAllRepository();
  }

  async getPlanDetailService(id) {
    const plan = await this.repo.findByIdRepository(id);
    if (!plan) throw new Error('plan not found');
    return plan;
  }
}

module.exports = PlanService;
class ResultService {
  constructor(repo) {
    this.repo = repo;
  }

  async getAllResultService() {
    return await this.repo.findAllResultRepository();
  }
  
  async bulkCreateResultService(data) {
    const planId = data.planId;
    const inspectorId = data.inspectorId;
    const resultsData = data.results;
    const rowsToSave = resultsData.map(r => ({
      planId: planId,
      inspectorId: inspectorId,
      itemId: r.itemId,
      value: String(r.value),
      status: r.status || 'NORMAL',
      comment: r.comment,
      completedAt: new Date()
    }));

    return this.repo.bulkCreateReultRepository(rowsToSave)
  }

}

module.exports = ResultService;
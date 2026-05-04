class RecordService {
  constructor(repo) {
    this.repo = repo;
  }

  async createService(data) {
    return await this.repo.createRepository(data);
  }


  async getAllRecordService() {
    return await this.repo.findAllRecordRepository();
  }

}

module.exports = RecordService;
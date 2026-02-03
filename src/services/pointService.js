class PointService {
  constructor(repo) {
    this.repo = repo;
  }

  async createPointService(data) {
    return await this.repo.createRepository(data);
  }

  async getAllPointsService() {
    return await this.repo.findAllRepository();
  }

  async getPointDetailService(id) {
    const point = await this.repo.findByIdRepository(id);
    if (!point) throw new Error('point not found');
    return point;
  }
}

module.exports = PointService;
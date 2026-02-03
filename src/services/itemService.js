class ItemService {
  constructor(repo) {
    this.repo = repo;
    this.ALLOWED_TYPES = ['boolean', 'numeric', 'text', 'multiple'];
  }

  async createItemService(data) {
    const { name, dataType, isRequired, pointId } = data;

    return await this.repo.createRepository({ name, dataType, isRequired, pointId });
  }

  async findAllItemByPointId(data) {
    return await this.repo.findAllItemByPointId(data);
  }

  async getAllItemsService() {
    return await this.repo.findAllRepository();
  }
}

module.exports = ItemService;
class ItemService {
  constructor(repo) {
    this.repo = repo;
    this.ALLOWED_TYPES = ['boolean', 'numeric', 'text', 'multiple'];
  }

  async createItemService(data) {
    const { name, dataType, isRequired } = data;
    
    if (!this.ALLOWED_TYPES.includes(dataType)) {
      const error = new Error(`無效類型。允許: ${this.ALLOWED_TYPES.join(', ')}`);
      error.statusCode = 400;
      throw error;
    }

    const existing = await this.repo.findByNameRepository(name);
    if (existing) {
      const error = new Error(`巡檢項目 '${name}' 已存在`);
      error.statusCode = 409;
      throw error;
    }

    return await this.repo.createRepository({ name, dataType, isRequired });
  }

  async getAllItemsService() {
    return await this.repo.findAllRepository();
  }
}

module.exports = ItemService;
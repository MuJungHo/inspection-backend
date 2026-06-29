class ItemService {
  constructor(repo) {
    this.repo = repo;
    this.ALLOWED_TYPES = ['single', 'numeric', 'text', 'multiple'];
  }

  async createItemService(data) {
    return await this.repo.createRepository(data);
  }

  async findAllItemByPointId(data) {
    return await this.repo.findAllItemByPointId(data);
  }

  async getAllItemsService() {
    return await this.repo.findAllRepository();
  }

  async deleteItemService(itemId) {
    const item = await this.repo.findByIdRepository(itemId);
    if (!item) {
      return { success: false, code: 404, message: '找不到該巡檢項目' };
    }


    await this.repo.deleteRepository(itemId);
    return { success: true, code: 200, message: '項目已成功移除' };

  }

  async updateItemService(itemId, data) {
    const item = await this.repo.findByIdRepository(itemId);
    if (!item) {
      return { success: false, code: 404, message: '找不到該巡檢項目' };
    }


    await this.repo.updateRepository(itemId, data);
    return { success: true, code: 200, message: '項目已成功更新' };

  }
}

module.exports = ItemService;
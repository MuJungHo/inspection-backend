const { User } = require('../../models');

class UserRepository {
  constructor() {
  }

  async createRepository(data) {
    return await User.create(data);
  }

  async findByEmailRepository(email) {
    return await User.findOne({ where: { email } });
  }

  async findAllRepository() {
    return await User.findAll({
      order: [['createdAt', 'DESC']]
    });
  }
}

module.exports = UserRepository;
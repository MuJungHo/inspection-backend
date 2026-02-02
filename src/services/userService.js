class UserService {
  constructor(repo) {
    this.repo = repo;
  }

  async createUserService(username, email) {
    if (!username || !email) {
      const error = new Error('Username and email are required');
      error.statusCode = 400;
      throw error;
    }

    const existingUser = await this.repo.findByEmailRepository(email);
    if (existingUser) {
      const error = new Error('Email already exists');
      error.statusCode = 409;
      throw error;
    }

    return await this.repo.createRepository({ username, email });
  }

  async getAllUserService() {
    return await this.repo.findAllRepository();
  }
}

module.exports = UserService;
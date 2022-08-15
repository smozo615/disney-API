const bcrypt = require('bcryptjs');
const boom = require('@hapi/boom');

// Models
const { models } = require('../db/sequelize');

class UsersService {
  async createUser(data) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hashPassword,
    });
    return newUser;
  }

  async getAllUser() {
    const users = await models.User.findAll({
      attributes: ['email']
    });
    return users;
  }

  async findUserById(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async updateUser(id, changes) {
    const user = await this.findUserById(id);
    if (changes.password) {
      changes.password = await bcrypt.hash(changes.password, 10);
    }
    const updatedUser = await user.update(changes);
    return updatedUser;
  }

  async deleteUser(id) {
    const user = await this.findUserById(id);
    await user.destroy();
    return { state: 'deleted' };
  }
}

module.exports = { UsersService };

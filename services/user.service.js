const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const boom = require('@hapi/boom');

class UsersService {
  async createUser(data) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    const newData = {
      id: uuidv4(),
      ...data,
      password: hashPassword,
    };
    const newUser = newData;
    delete newUser.password;
    delete newUser.id;
    return newUser;
  }

  async getAllUser() {
    const users = db;
    return users;
  }

  async findUserById(id) {
    const user = db.find((user) => user.id === id);
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
    const updatedUser = { ...user, ...changes };
    delete updatedUser.password;
    delete updatedUser.id;
    return updatedUser;
  }

  async deleteUser(id) {
    const user = await this.findUserById(id);
    return user;
  }
}

const db = [
  { id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb5d' },
  { id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' },
  { id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb7d' },
];

module.exports = { UsersService };

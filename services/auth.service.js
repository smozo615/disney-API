const bcrypt = require('bcryptjs');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

// Models
const { models } = require('../db/sequelize');

class AuthService {
  async login(data) {
    const loggedUser = await this.validateLoginData(data);
    const token = await this.signtoken(loggedUser);
    return token;
  }

  async validateLoginData(data) {
    const { email, password } = data;
    const user = await this.getUserByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    return user;
  }

  async getUserByEmail(email) {
    const user = await models.User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async signtoken(userData) {
    const payload = {
      sub: userData.id,
    };
    const token = jwt.sign(payload, process.env.JWTSECRET);
    return token;
  }
}

module.exports = { AuthService };

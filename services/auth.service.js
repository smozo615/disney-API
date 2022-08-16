const bcrypt = require('bcryptjs');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Models
const { models } = require('../db/sequelize');

class AuthService {
  async login(data) {
    const loggedUser = await this.validateLoginData(data);
    const token = await this.signtoken(loggedUser);
    return { token: token };
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

  async signtoken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWTSECRET);
    return token;
  }

  async registerUser(data) {
    await models.User.create(data);
    await this.sendWelcomeEmail(data.email);
    return { message: 'registered user' };
  }

  async sendWelcomeEmail(email) {
    const user = await this.getUserByEmail(email);
    const token = await this.signtoken(user);
    const adminToken = process.env.ADMIN_TOKEN;

    const emailText = `welcome to the world of disney
    and thank you for joining our wonderful community;
    This is your token: ${token}. with it you can access get-type endpoints.
    If you want to try the others, use this admin token: ${adminToken}`;

    const emailHtml = `<h1>welcome to the world of disney</h1>
    <h4>Thank you for joining our wonderful community</h4>
    <p>This is your token:</p><p><b>${token}</b></p><p>with it you can access get-type endpoints.<br>
    If you want to try the others, use this admin token:</p><p><b>${adminToken}</b><p/>`;

    const infoEmail = {
      from: process.env.NODEMAILER_EMAIL,
      to: `${email}`,
      subject: 'Welcome to disney!',
      text: emailText,
      html: emailHtml,
    };

    await this.sendEmail(infoEmail);
  }

  async sendEmail(infoEMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
    await transporter.sendMail(infoEMail);
  }
}

module.exports = { AuthService };

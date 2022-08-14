const { Model, DataTypes } = require('sequelize');

// Table Name
const USER_TABLE_NAME = 'users';

// Table schema
const UserSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

// Extending Model
class User extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE_NAME,
      modelName: 'User',
    };
  }
}

module.exports = { USER_TABLE_NAME, UserSchema, User };

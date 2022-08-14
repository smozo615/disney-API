const { Model, DataTypes } = require('sequelize');

// Table Name
const CHARACTER_TABLE_NAME = 'characters';

// Table Schema
const CharacterSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  age: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  weight: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  story: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

// Extending Model
class Character extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: CHARACTER_TABLE_NAME,
      modelName: 'Character',
      timestamps: false, // Personal Decision
    };
  }
}

module.exports = { CHARACTER_TABLE_NAME, CharacterSchema, Character };

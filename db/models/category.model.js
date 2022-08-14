const { Model, DataTypes } = require('sequelize');

// Table Name
const CATEGORY_TABLE_NAME = 'categories';

// Table Schema
const CategorySchema = {
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
};

// Extending Model
class Category extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE_NAME,
      modelName: 'Category',
      timestamps: false, // Personal Decision
    };
  }
}

module.exports = { Category, CategorySchema, CATEGORY_TABLE_NAME };

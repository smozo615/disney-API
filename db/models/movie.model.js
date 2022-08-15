const { Model, DataTypes } = require('sequelize');

// FOREIGN KEY TABLE
const { CATEGORY_TABLE_NAME } = require('./category.model');

// Table Name
const MOVIE_TABLE_NAME = 'movies';

// Table Schema
const MovieSchema = {
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
  title: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  releaseDate: {
    type: DataTypes.DATE,
    field: 'release_date',
    allowNull: false,
  },
  stars: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE_NAME,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

// Extending Model
class Movie extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' });
    this.belongsToMany(models.Character, {
      through: models.CharacterMovie,
      as: 'characters',
      foreignKey: 'movieId',
      otherKey: 'characterId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MOVIE_TABLE_NAME,
      modelName: 'Movie',
      timestamps: false, // Personal Decision
    };
  }
}

module.exports = { MOVIE_TABLE_NAME, MovieSchema, Movie };

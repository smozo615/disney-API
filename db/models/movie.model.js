const { Model, DataTypes } = require('sequelize');

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
};

// Extending Model
class Movie extends Model {
  static associate() {}

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

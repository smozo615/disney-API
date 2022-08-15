const { Model, DataTypes } = require('sequelize');

// Table Name
const CHARACTER_MOVIE_TABLE_NAME = 'character_movie';

// FOREIGN KEY TABLE
const { CHARACTER_TABLE_NAME } = require('./character.model');
const { MOVIE_TABLE_NAME } = require('./movie.model');

// Table Schema
const CharacterMovieSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
  },
  characterId: {
    field: 'character_id',
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: CHARACTER_TABLE_NAME,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  movieId: {
    field: 'movie_id',
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: MOVIE_TABLE_NAME,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
};

// Extending Model
class CharacterMovie extends Model {
  static associate() {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CHARACTER_MOVIE_TABLE_NAME,
      modelName: 'CharacterMovie',
      timestamps: false,
    };
  }
}

module.exports = {
  CHARACTER_MOVIE_TABLE_NAME,
  CharacterMovieSchema,
  CharacterMovie,
};

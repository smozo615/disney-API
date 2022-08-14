const { User, UserSchema } = require('./user.model');
const { Character, CharacterSchema } = require('./character.model');
const { Category, CategorySchema } = require('./category.model');
const { Movie, MovieSchema } = require('./movie.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Character.init(CharacterSchema, Character.config(sequelize));
  Movie.init(MovieSchema, Movie.config(sequelize));

  Movie.associate(sequelize.models);
  Category.associate(sequelize.models);
}

module.exports = setupModels;

const { User, UserSchema } = require('./user.model');
const { Character, CharacterSchema } = require('./character.model');
const { Category, CategorySchema } = require('./category.model');
const { Movie, MovieSchema } = require('./movie.model');
const {
  CharacterMovie,
  CharacterMovieSchema,
} = require('./characterMovie.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Character.init(CharacterSchema, Character.config(sequelize));
  Movie.init(MovieSchema, Movie.config(sequelize));
  CharacterMovie.init(CharacterMovieSchema, CharacterMovie.config(sequelize));

  Movie.associate(sequelize.models);
  Category.associate(sequelize.models);
  Character.associate(sequelize.models);
}

module.exports = setupModels;

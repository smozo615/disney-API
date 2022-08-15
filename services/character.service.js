const boom = require('@hapi/boom');

// Models
const { models } = require('../db/sequelize');

class CharactersService {
  async createCharacter(data) {
    const newCharacter = await models.Character.create(data);
    return newCharacter;
  }

  async getAllCharacters({ name, age, movieId }) {
    // Query Options
    const options = {
      attributes: ['image', 'name'],
      where: {},
    };
    if (name) {
      options.where.name = name;
    }
    if (age) {
      options.where.age = age;
    }
    if (movieId) {
      options.include = {
        association: 'movies',
        attributes: [],
        through: {
          attributes: [],
        },
        where: { id: movieId },
      };
    }
    const characters = await models.Character.findAll(options);
    return characters;
  }

  async findCharacterById(id) {
    const character = await models.Character.findByPk(id, {
      include: {
        association: 'movies',
        attributes: ['image', 'title'],
        through: {
          attributes: [],
        },
      },
      attributes: { exclude: ['id'] },
    });
    if (!character) {
      throw boom.notFound('Character not found');
    }
    return character;
  }

  async updateCharacter(id, changes) {
    const character = await this.findCharacterById(id);
    const updatedCharacter = character.update(changes);
    return updatedCharacter;
  }

  async deleteCharacter(id) {
    const character = await this.findCharacterById(id);
    await character.destroy();
    return { state: 'deleted' };
  }
}

module.exports = { CharactersService };

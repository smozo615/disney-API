const boom = require('@hapi/boom');

// Models
const { models } = require('../db/sequelize');

class CharactersService {
  async createCharacter(data) {
    const newCharacter = await models.Character.create(data);
    return newCharacter;
  }

  async getAllCharacters() {
    const characters = await models.Character.findAll({
      attributes: ['image', 'name'],
    });
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

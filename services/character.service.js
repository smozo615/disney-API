const { v4: uuidv4 } = require('uuid');
const boom = require('@hapi/boom');

class CharactersService {
  async createCharacter(data) {
    const newData = {
      id: uuidv4(),
      ...data,
    };
    const newCharacter = newData;
    return newCharacter;
  }

  async getAllCharacters() {
    const characters = db;
    return characters;
  }

  async findCharacterById(id) {
    const character = db.find((character) => character.id === id);
    if (!character) {
      throw boom.notFound('Character not found');
    }
    return character;
  }

  async updateCharacter(id, changes) {
    const character = await this.findCharacterById(id);
    const updatedCharacter = { ...character, ...changes };
    return updatedCharacter;
  }

  async deleteCharacter(id) {
    const character = await this.findCharacterById(id);
    return character;
  }
}

const db = [
  { id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb5d' },
  { id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' },
  { id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb7d' },
];

module.exports = { CharactersService };

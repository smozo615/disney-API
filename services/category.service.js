const { v4: uuidv4 } = require('uuid');
const boom = require('@hapi/boom');

class CategoriesService {
  async createCategory(data) {
    const newData = {
      id: uuidv4(),
      ...data,
    };
    const newCategory = newData;
    return newCategory;
  }

  async getAllCategories() {
    const categories = db;
    return categories;
  }

  async findCategoryById(id) {
    const category = db.find((category) => category.id === id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async updateCategory(id, changes) {
    const category = await this.findCategoryById(id);
    const updatedCategory = { ...category, ...changes };
    return updatedCategory;
  }

  async deleteCategory(id) {
    const category = await this.findCategoryById(id);
    return category;
  }
}

const db = [
  { id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb5d' },
  { id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' },
  { id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb7d' },
];

module.exports = { CategoriesService };

const boom = require('@hapi/boom');

// Models
const { models } = require('../db/sequelize');

class CategoriesService {
  async createCategory(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async getAllCategories() {
    const categories = await models.Category.findAll({
      attributes: { exclude: ['id'] },
    });
    return categories;
  }

  async findCategoryById(id) {
    const category = await models.Category.findByPk(id, {
      attributes: { exclude: ['id'] },
      include: {
        association: 'movies',
        attributes: ['image', 'title', 'releaseDate', 'stars'],
      },
    });
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async updateCategory(id, changes) {
    const category = await this.findCategoryById(id);
    const updatedCategory = await category.update(changes);
    return updatedCategory;
  }

  async deleteCategory(id) {
    const category = await this.findCategoryById(id);
    await category.destroy();
    return category;
  }
}

module.exports = { CategoriesService };

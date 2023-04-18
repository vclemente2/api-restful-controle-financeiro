const categoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
	async findAll(req, res) {
		const categories = await categoryRepository.findAll();

		return res.status(200).json(categories);
	}
}

module.exports = new CategoryController();

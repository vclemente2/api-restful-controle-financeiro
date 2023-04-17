const BaseRepository = require("./BaseRepository");

class CategoryRepository extends BaseRepository {
    constructor() {
        super('categories');
    }
}

module.exports = new CategoryRepository();

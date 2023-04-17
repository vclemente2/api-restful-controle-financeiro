const connection = require("../connection/database");

class BaseRepository {
    constructor(table) {
        this.table = table;
    }

    async create(data) {
        return await connection(this.table).insert(data).returning('*');
    }
    async findOne(id) {
        return await connection(this.table).where({ id }).first();
    }
    async findAll() {
        return await connection(this.table);
    }
    async update(id, data) {
        return await connection(this.table).where({ id }).update(data).returning('*');
    }
    async destroy(id) {
        return await connection(this.table).where({ id }).delete();
    }
}

module.exports = BaseRepository;
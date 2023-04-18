const connection = require("../connection/database");

const objects = {
}


class BaseRepository {
    constructor(table) {
        this.table = table;
    }

    /** Insert data into the database
     * 
     * @param {Object} data - It must be an object with the data that will be inserted in the database
     * @returns {Promise<Object[]>} A promise that resolves to an array of objects representing the saved data. 
     */
    async create(data) {
        return await connection(this.table).insert(data).returning('*');
    }

    /** Searching for a record in the database by its ID
     * 
     * @param {String} id - The id to be fetched from the database
     * @returns {Promise<Object>} A promise that resolves to an object representing the record
     */
    async findOne(id) {
        return await connection(this.table).where({ id }).first();
    }

    /** Search all records in the database
    *
    * @returns {Promise<Object[]>} A promise that resolves to an array of objects representing the records.
    */
    async findAll() {
        return await connection(this.table);
    }

    /** Updates a record data in the database
    * 
    * @param {String} id The id to be fetched from the database
    * @param {Object} data It must be an object with the data that will be updated in the database
    * 
    * @returns {Promise<Object>} A promise that resolves to an object representing the record.
    */
    async update(id, data) {
        return await connection(this.table).where({ id }).update(data).returning('*');
    }


    /** Delete a record in database by their ID
    * 
    * @param {String} id The record ID that will be deleted from the database
    */
    async destroy(id) {
        return await connection(this.table).where({ id }).delete();
    }
}

module.exports = BaseRepository;

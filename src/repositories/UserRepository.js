const connection = require("../connection/database");
const BaseRepository = require("./BaseRepository");

class UserRepository extends BaseRepository {
    constructor() {
        super('users');
    }

    /** Insert a user on database
    * 
    * @param {Object} data An object with the data for the user. The object must have the following properties:
    *   - name: The user's name (required)
    *   - email: The user's email address (required)
    *   - password: The user's password (required)
    *
    * @returns {Promise<Object[]>} A promise that resolves to an array of objects representing the saved users. Each object has the following properties:
    *   - id: The unique identifier of the user in the database
    *   - name: The user's name
    *   - email: The user's email address
    */
    async create(data) {
        return super.create(data)
    }

    /** Search for a user in database by their ID
    * 
    * @param {String} id The user id to be fetched from the database
    *
    * @returns {Promise<Object>} A promise that resolves to an object representing the user. The object has the following properties:
    *   - id: The unique identifier of the user in the database
    *   - name: The user's name
    *   - email: The user's email address
    */
    async findOne(id) {
        return super.findOne(id);
    }

    /** Search for all users in database
    *
    * @returns {Promise<Object[]>} A promise that resolves to an array of objects representing the users. The objects has the following properties:
    *   - id: The unique identifier of the user in the database
    *   - name: The user's name
    *   - email: The user's email address
    *   - password: The user's password
    */
    async findAll() {
        return super.findAll();
    }

    /** Updates a user's data in the database
    * 
    * @param {String} id The user id to be fetched from the database
    * @param {Object} data An object with the data for the user. The object must have the following properties:
    *   - name: The user's name (required)
    *   - email: The user's email address (required)
    *   - password: The user's password (required)
    * 
    * @returns {Promise<Object>} A promise that resolves to an object representing the user. The object has the following properties:
    *   - id: The unique identifier of the user in the database
    *   - name: The user's name
    *   - email: The user's email address
    */
    async update(id, data) {
        return super.update(id, data);
    }

    /** Delete a user in database by their ID
    * 
    * @param {String} id The user ID that will be deleted from the database
    */
    async destroy(id) {
        return super.destroy(id);
    }

    /** Search for a user in database by their email
    * 
    * @param {String} email The user email to be fetched from the database
    *
    * @returns {Promise<Object>} A promise that resolves to an object representing the user. The object has the following properties:
    *   - id: The unique identifier of the user in the database
    *   - name: The user's name
    *   - email: The user's email address
    *   - password: The user's password
    */
    async findByEmail(email) {
        return connection(this.table).where({ email }).first();
    }
}

module.exports = new UserRepository();

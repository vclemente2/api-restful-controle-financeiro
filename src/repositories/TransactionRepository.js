const BaseRepository = require("./BaseRepository");

class TransactionRepository extends BaseRepository {
    constructor() {
        super('transactions');
    }
}

module.exports = new TransactionRepository();

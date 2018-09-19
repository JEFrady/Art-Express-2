class ProductInventory {
    constructor() {
        this.knex = require('../knex/knex.js')
    }
    all() {
        return this.knex.raw('SELECT * FROM items');
    }
}
module.exports = ProductInventory;
class ArticleInventory {
    constructor(){
        this.knex = require('../knex/knex.js')
    }
    all() {
        return this.knex.raw('SELECT * FROM copy')
    }
}
module.exports = ArticleInventory;
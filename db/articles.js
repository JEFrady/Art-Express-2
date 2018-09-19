class ArticleInventory {
    constructor(){
        this.knex = require('../knex/knex.js')
    }
    all() {
        return this.knex.raw('SELECT * FROM copy')
    }
    
    getItemByTitle(title) {
        let article = this._storage.filter(item => title == item.title);
        if (article.length > 0) {
            return article[0]
        }
    }
    add(item) {
        item.id = this._count;
        this._storage.push(item);
        this._count++;
        return item.id;
    }
    updateItemByTitle(title, req) {
        let temp = this._storage.filter(item => title == item.title);
        let article = temp[0]
        article.title = req.body.title
        article.author = req.body.author
        article.body = req.body.body

        return article
    }
    deleteItemByTitle(title) {
        let storage = this._storage
        let article = this._storage.filter(item => title == item.title);
        for(let i=0; i<storage.length; i++){
            if (storage[i].title == title) {  
                storage.splice(i, 1)
                return storage
            }
        }

    }
}
module.exports = ArticleInventory;
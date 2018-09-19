const express = require('express');
const artRouter = express.Router();

const knex = require('../knex/knex.js');

///ARTICLES//////////////////////////////////////////////////

    /// Inventory
    const ArticleInventory = require('../db/articles.js');
    const artInv = new ArticleInventory();

    //////////ARTICLES//////////
    artRouter.get('/', (req, res) => {
        // const items = artInv.all();
        // res.render('articlecat', { items });
        artInv.all()
            .then ( results => {
                console.log('Render /articles page', results)
                const items = results.rows
                res.render('articlecat', { items });
            })
            .catch ( err => {
                console.log('error', err)
            })
    });

    // //////////NEW ARTICLE FORM//////////
    // artRouter.get('/new', (req, res) => {
    //     console.log('Render /articles/new page')
    //     res.render('newArt');
    // });

    // //////////ARTICLE DETAIL PAGE//////////
    // artRouter.get('/:title', (req, res) => {
    //     console.log('Render /articles/:title page')
    //     const { title } = req.params;
    //     const item = artInv.getItemByTitle(title);
    //     console.log('Article', item.title);
    //     res.render('article', item);
    // });

    // //////////EDIT//////////
    // artRouter.get('/:title/edit', (req, res) => {
    //     console.log('Render /articles/:title/edit page')
    //     const { title } = req.params;
    //     const item = artInv.getItemByTitle(title);
    //     // console.log('Product', item);
    //     res.render('editArt', item);

    // });

    // //////////CREATE ARTICLE//////////
    // artRouter.post('/new', (req, res) => {
    //     const item = req.body;
    //     if (item.title !== '' && item.author !== '' && item.body !== '') {
    //         artInv.add(item);
    //         res.redirect('/articles')  
    //     }
    //     else {
    //         console.log('Unknown error')
    //     }
    // });

    // //////////EDIT ARTICLE//////////
    // artRouter.put('/:title/edit', (req, res) => {
    //     const { title } = req.params;
    //     const item = artInv.updateItemByTitle(title, req);
    //     console.log('Put', item)

    //     res.redirect('/articles') 
    // });

    // //////////DELETE ARTICLE//////////
    // artRouter.delete('/:title', (req, res) => {
    //     const { title } = req.params;
    //     // console.log(title)
    //     const item = artInv.deleteItemByTitle(title);
    //     res.redirect('/articles')
    // });    

    module.exports = artRouter
const express = require('express');
const artRouter = express.Router();

const knex = require('../knex/knex.js');

///ARTICLES//////////////////////////////////////////////////

    /// Inventory
    const ArticleInventory = require('../db/articles.js');
    const artInv = new ArticleInventory();

    //////////ARTICLES//////////
    artRouter.get('/', (req, res) => {
        artInv.all()
            .then ( results => {
                console.log('Render /articles page', results.rows)
                const items = results.rows
                res.render('articlecat', { items });
            })
            .catch ( err => {
                console.log('error', err)
            })
    });

    // //////////NEW ARTICLE FORM//////////
    artRouter.get('/new', (req, res) => {
        console.log('Render /articles/new page')
        res.render('newArt');
    });

    // //////////ARTICLE DETAIL PAGE//////////
    artRouter.get('/:title', (req, res) => {
        console.log('Render /articles/:title page')
        const { title } = req.params;
        knex.raw(`SELECT * FROM copy WHERE title = '${title}'`)
            .then( result => {
                console.log('Article', result.rows)
                const item = result.rows[0]
                res.render('article', item)

            })
            .catch( err => {
                console.log('Error', err)
            })
    });

    //////////EDIT//////////
    artRouter.get('/:title/edit', (req, res) => {
        console.log('Render /articles/:title/edit page')
        const { title } = req.params;
        knex.raw(`SELECT * FROM copy WHERE title = '${title}'`)
            .then( result => {
                console.log('Article', result.rows)
                const item = result.rows[0]
                console.log(item)
                res.render('editArt', item)
            })
            .catch( err => {
                console.log('error', err)
            })
    });

    // //////////CREATE ARTICLE//////////
    artRouter.post('/new', (req, res) => {
        const item = req.body;
        knex.raw(`INSERT INTO copy (title, author, body) VALUES ('${item.title}','${item.author}', '${item.body}')`)
            .then( result => {
                res.redirect('/articles')
            })
            .catch( err => {
                console.log('error', err)
            })
    });

    //////////EDIT ARTICLE//////////
    artRouter.put('/:title/edit', (req, res) => {

        const { title } = req.params;
        const artitle = req.body.title
        const arauth = req.body.author
        const arbody = req.body.body
        knex.raw(`UPDATE copy SET title = '${artitle}', author = '${arauth}', body = '${arbody}' WHERE title = '${title}'`)
        .then( result => {
            res.redirect(`/articles`)
        })
        .catch( err => {
            console.log('error', err)
        })
    });

    //////////DELETE ARTICLE//////////
    artRouter.delete('/:title', (req, res) => {
        const { title } = req.params;
        console.log(title)
        knex.raw(`DELETE FROM copy WHERE title = '${title}'`)
            .then( result => {
                res.redirect('/articles')
            })
            .catch( err => {
                console.log('error', err)
            })
    });    

    module.exports = artRouter
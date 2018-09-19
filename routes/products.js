const express = require('express');
const prodRouter = express.Router();

const knex = require('../knex/knex.js');


///PRODUCT//////////////////////////////////////////////////

    /// Inventory
    const ProductInventory = require('../db/products.js');
    const prodInv = new ProductInventory();

    //////////Products//////////
    prodRouter.get('/', (req, res) => {
        prodInv.all()
            .then( results => {
                console.log('Render /products page', results.rows);
                const items = results.rows;
                res.render('productcat', { items });
            })
            .catch( err => {
                console.log('error', err)
            })
    });

    //////////NEW PRODUCT FORM//////////
    prodRouter.get('/new', (req, res) => {
        console.log('Render /products/new page')
        res.render('new');
    });

    //////////PDP//////////
    prodRouter.get('/:id', (req, res) => {
        console.log('Render /products/:id page')
        const { id } = req.params;
        knex.raw(`SELECT * FROM items WHERE id = ${id}`)
            .then( result => {
                console.log('Product', result.rows)
                const item = result.rows[0]
                res.render('product', item)
            })
            .catch( err => {
                console.log('error', err)
            })
    });

    //////////EDIT//////////
    prodRouter.get('/:id/edit', (req, res) => {
        console.log('Render /products/:id/edit page', req.params)
        const { id } = req.params;
        knex.raw(`SELECT * FROM items WHERE id = ${id}`)
            .then( result => {
                console.log('Product', result.rows)
                const item = result.rows[0]
                console.log(item)
                res.render('edit', item)
            })
            .catch( err => {
                console.log('error', err)
            })

    });

    //////////CREATE PRODUCT//////////
    prodRouter.post('/new', (req, res) => {
        const item = req.body;
        knex.raw(`INSERT INTO items (name, price, inventory) VALUES ('${item.name}','${item.price}', '${item.inventory}')`)
            .then( result => {
                res.redirect('/products')
            })
            .catch( err => {
                console.log('error', err)
            })
    });

    //////////EDIT PRODUCT//////////
    prodRouter.put('/:id/edit', (req, res) => {
        const { id } = req.params
        const detail = req.body
        knex.raw(`UPDATE items SET name = '${detail.name}', price = ${detail.price}, inventory = ${detail.inventory} WHERE id = ${id}`)
            .then( result => {
                res.redirect(`/products`)
            })
            .catch( err => {
                console.log('error', err)
            })
    });

    //////////DELETE PRODUCT//////////
    prodRouter.delete('/:id', (req, res) => {
        const { id } = req.params;
        knex.raw(`DELETE FROM items WHERE id = ${id}`)
            .then( result => {
                res.redirect('/products')
            })
            .catch( err => {
                console.log('error', err)
            })
    });

    module.exports = prodRouter
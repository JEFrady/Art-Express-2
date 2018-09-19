/// App
const express = require('express');
const app = express();
const bp = require('body-parser');
const expressHbs = require('express-handlebars');

const artRoute = require('./routes/articles.js');
const prodRoute = require('./routes/products.js');

const methOver = require('method-override');


/// USE
app.use(express.static( __dirname + '/public'));
app.use(bp.urlencoded({ extended: true }));
app.use(methOver('_method'));
app.use('/products', prodRoute);
app.use('/articles', artRoute);


// app.use(express.static('public'));
app.engine('.hbs', expressHbs({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

///HOME//////////////////////////////////////////////////
app.get('/', (req, res) => {
    console.log('Render home page')
    res.render('home')
})


/// LISTEN
app.listen(process.env.EXPRESS_CONTAINER_PORT, () => {
    console.log(`Started app on port: ${process.env.EXPRESS_CONTAINER_PORT}`);
  });

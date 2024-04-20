
require('dotenv').config()

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const mongoose = require('mongoose')

function connectToMongoDB(){
  const url = `mongodb+srv://${process.env.user}:${process.env.pw}@inventory-app-cluster0.4ijgyem.mongodb.net/${process.env.db}?retryWrites=true&w=majority&appName=inventory-app-Cluster0`
  mongoose.connect(url)
  .then( () => console.log('coneected to mongodb atlas'))
  .catch( error => console.log(error))
  .then( () => {
    app.listen(port, () => {
      console.log('server listening on port ' + port);
    });
  })
}

const port = process.env.PORT || 3000;

const { indexRouter } = require('./routes/index.route');

app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');
app.set('views', path.resolve(__dirname, 'views'));
app.use(expressLayouts);
app.use(express.static('public'));

connectToMongoDB()

app.use('/', indexRouter);


require('dotenv').config()
const express = require('express')
const path = require('path')
const hbs = require('express-handlebars')

const app = express()
const server = require('http').Server(app)

const port = process.env.PORT || 4000
const publicPath = path.join(__dirname, './public/')

//nmodules

// routes
const home = require('./routes/home.js');

app
  .set('view engine', 'hbs')
  .engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/'
  }))

  .use('/', express.static(publicPath))

  // Get routes
  .get('/', home)


server.listen(port, () => console.log(`App listening on port ${port}!`));
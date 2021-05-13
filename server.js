require('dotenv').config()
const express = require('express')
const path = require('path')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')

const MongoClient = require('mongodb')
const mongoose = require('mongoose')

const multer = require('multer')
const app = express()
const server = require('http').Server(app)

const port = process.env.PORT || 4000
const publicPath = path.join(__dirname, './public/')

// multer and bodyparser middleware for form data

const urlencodedParser = bodyParser.urlencoded({
  extended: true
})

const upload = multer({
  dest: 'static/upload/'
})

// body parser and multer middleware for form data

// mongoose and DB setup

// const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@foodlove.i09d7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
//
// async function connect() {
//   try {
//     await mongoose.connect(url, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//       useCreateIndex: true
//     }).then(async function() {
//       console.log(mongoose.connection)
//     })
//   } catch (e) {
//     console.log(e)
//   }
// }
//
// connect()

// mongoose and DB setup

// routes
const home = require('./routes/home.js')
const register = require('./routes/register.js')
const dataManager = require('./modules/dataManager.js')

const notFound = require('./routes/notFound.js')

app
  .set('view engine', 'hbs')
  .engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/'
  }))

  .use('/', express.static(publicPath))
  .use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.secret,
    cookie: {
      maxAge: 3600000
    }
  }))
  .use(
    bodyParser.urlencoded({
      extended: true
    })
  )

  // Get routes
  .get('/', home)
  .get('/register', register)
  .get('/logout', function(req, res) {
    req.session.destroy()

    res.redirect('/')
  })

  //POSTfrom forms
  .post('/register', register)

  //AJAX calls
  .post('/login', dataManager.logIn)
  .post('/checkemail', dataManager.checkIfExists)

  // 404 not found
  .use(notFound)


server.listen(port, () => console.log(`App listening on port ${port}!`));
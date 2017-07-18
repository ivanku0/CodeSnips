//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');

// create application
const app = express()

//connect to db
mongoose.connect('mongodb://w4ng:1bigpanda@ds027318.mlab.com:27318/clusters-revenge')

//require models
const Snippet = require('./models/Snippet');
const Resource = require('./models/Resource');

// const Models = require('./models/');


//require controllers
const appRoutes = require ('./routes/index.js')
const snipRoutes = require ('./routes/snippets.js')
const resourceRoutes = require ('./routes/resources.js')

//hbs
app.engine('handlebars', hbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//css
app.use(express.static('public'))

//bodyParser
app.use(bodyParser.urlencoded({extended: true}))

//application routes
app.use('/', appRoutes)
app.use('/', snipRoutes)
app.use('/snippets', resourceRoutes)

app.listen( process.env.PORT || 3000), () => {

  console.log( 'server listening on 3000, locally' )

})

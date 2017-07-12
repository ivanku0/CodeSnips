//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');

// create application
const app = express()

//connect to db
mongoose.connect('mongodb://w4ng:1bigpanda@clustersrevenge-shard-00-00-z110i.mongodb.net:27017,clustersrevenge-shard-00-01-z110i.mongodb.net:27017,clustersrevenge-shard-00-02-z110i.mongodb.net:27017/codesnips?ssl=true&replicaSet=ClustersRevenge-shard-0&authSource=admin')

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

app.listen( 3000, () => {

  console.log( 'server listening on 3000' )

})

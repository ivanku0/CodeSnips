const express = require('express')
const Resource = require('../models/Resource.js')
const Snippet = require('../models/Snippet.js')
const resourceRoutes = express.Router()

//finding index routes


//get specific resource for a ID - using test instead of ID right now
resourceRoutes.get('/test', ( req , res ) => {

//   Resource.findOne({ '_id': req.params.id }, ( err, artist ) => {
//     console.log( artist )
//     res.render('artists/editArtist', artist)
//   })
// })

    res.render('./snips/resources/resource')

  })


//wont need this since this belongs to snippet

resourceRoutes.post('/test', (req,res) => {
  let resource = new Resource({
    title: String,
    url: String,
    description: String
  })

  console.log('this is my resource data ' + resource);

  //here i want to update an object's existing snippet.resources and push it in there

  //how do identify the specifc object to update here? how do we leverage the req.params from above for findbyID?

  // // this might work too?
  // Snippet.find({ username: 'starlord55' }

  Snippet.findById(1, function(err, snippet) {
  if (err) throw err;


  //identify array object of snippet schema
  let snippetResourceArray = snippet.resources

  //testing array id
  console.log(snippetResourceArray);

  //add new resource item into array
   snippetResourceArray.push(resource)

  // save the snippet information
  // we may need to save it to the database, reference it, and then push it to the array?

  snippet.save(function(err) {
    if (err) throw err;

    console.log('Snippet successfully updated!' + snippetResourceArray);
  })

  res.redirect('/')

})

})






// // model works!
// const testResource = new Resource ({
//   title: 'My helpfulshit',
//   url: 'stackoverflow.com',
//   description: 'an example thing'
//   })
//
// console.log(testResource);

module.exports = resourceRoutes

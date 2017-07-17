const express = require('express')
const Snippet = require('../models/Snippet.js')
const Resource = require('../models/Resource.js')
const snipRoutes = express.Router()


//defining route for viewing snippet detail (not currenly working / unsure if even necessary)


snipRoutes.get('/snippets/', ( req , res ) => {

  //query for specific snippet
  Snippet.findOne( {'_id': req.params.id }, (err, snippetReq) => {
    if (err) throw err;

    // object of all the users
    console.log(snippetReq);


    //this needs to render the right side of the page to just be data of one snippet object
    res.render('./snips/snippet', snippetReq)

    });



})

//saving new snippets
snipRoutes.post('/snippets', (req,res) => {
  let snippet = new Snippet({
    title: req.body.title,
    language: req.body.language,
    snippet: req.body.snippet,
    resources: [ ],
    tags: [ ],
    favorite: false
  })

  console.log('this is my snippet data ' + snippet);

  //save to DB
  snippet.save(function(err) {
  if (err) throw err;
  console.log('Snippet saved successfully!')
})

  res.redirect('/')

})


// render a specific page for each snippet
snipRoutes.get('/snippets/:id', ( req, res ) => {
  Snippet.findOne({ '_id': req.params.id }, ( err, snippet ) => {
    console.log( snippet )
    res.render('./snips/snippetDetail', snippet)
  })
})

// save resources to this specific snippet
snipRoutes.post('/snippets/:id', ( req, res ) => {

  Snippet.findById( req.params.id, ( err, post ) => {

    let resource = new Resource ({
      title: req.body.title,
      url: req.body.url,
      description: req.body.description

    })
    console.log('now testing my resource here: ' + resource);

    post.resources.push( req.body )
    post.save()

    // send user back to details page, with refreshed data? render works here to actually save that data. but handlebars doesn't see the data

    res.render( './snips/snippetDetail', { post: post } )
    // res.redirect( '/snippets/:id', { post: post } )
  })

})

//find and delete one snippet - this works!
snipRoutes.get('/snippets/delete/:id', ( req, res ) => {
  Snippet.findOneAndRemove({ _id: req.params.id }, function(err) {
    if (err) throw err;
     console.log('snippet deleted!');
     res.redirect( '/')
  });
});

//find and delte one resource
// snipRoutes.get('/snippets/:id/delete/', ( req, res ) => {
//   Resource.findOneAndRemove({ title: req.params.id }, function(err) {
//     if (err) throw err;
//     console.log('resource deleted! ');
//      res.redirect( '/')
//   });
// });


//this query won't work because its not in the mongoschema? its in the array of an object

// Snippet.find({}, function(err, users) {
//   if (err) throw err;
//
//   // object of all the users
//   console.log('my mongo query is here ' + users);
// });


// // schema testing works
// const testResource = new Snippet ({
//   title: 'My snippet',
//   language: 'JS',
//   snippet: 'console.log("hello world")',
//   resources: [ ]
// })
//
// console.log(testResource);


// push to tags array

snipRoutes.post('/snippets/:id', ( req, res ) => {

  Snippet.findById( req.params.id, ( err, post ) => {

    post.tags.push( req.body )
    post.save()

    })


    // send user back to details page, with refreshed data? render works here to actually save that data. but handlebars doesn't see the data

    res.render( './snips/snippetDetail', { post: post } )
    // res.redirect( '/snippets/:id', { post: post } )
  })



module.exports = snipRoutes

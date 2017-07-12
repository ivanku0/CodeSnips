const express = require('express')
const Snippet = require('../models/Snippet.js')
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


// // schema testing works
// const testResource = new Snippet ({
//   title: 'My snippet',
//   language: 'JS',
//   snippet: 'console.log("hello world")',
//   resources: [ ]
// })
//
// console.log(testResource);





module.exports = snipRoutes

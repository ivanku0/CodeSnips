const express = require('express')
const Snippet = require('../models/Snippet.js')
const appRoutes = express.Router()


//define index route

appRoutes.get('/', ( req , res ) => {

//query for Snippet objects in database

  Snippet.find( { }, (err, snippetList) => {
    if (err) throw err;

    // object of all the users
    // console.log(snippetList);

    res.render('index', { snippetList })

    });
    //query for user-defined snippet code

  // Snippet.findOne( { '_id': req.params.id }, (err, snippetCode) => {
  //     if (err) throw err;
  //
  //     // object of all the users
  //     // console.log(snippetList);
  //
  //     res.render('index', snippetCode)
  //
  //     });

})


module.exports = appRoutes

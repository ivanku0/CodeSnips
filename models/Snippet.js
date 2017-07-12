const mongoose = require('mongoose')
const Schema = mongoose.Schema

const snippetSchema = new Schema({
  title: String,
  language: String,
  snippet: String,
  resources: Array,
  favorite: Boolean
})


const Snippet = mongoose.model( 'snippets', snippetSchema )

module.exports = Snippet

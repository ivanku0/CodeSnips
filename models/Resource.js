const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resourceSchema = new Schema({
  title: String,
  url: String,
  description: String
})

const Resource = mongoose.model( 'resources', resourceSchema )

module.exports = Resource

const mongoose = require('mongoose')

const stallSchema = mongoose.Schema({
  name: String,
  image: String
})

module.exports = mongoose.model('stall', stallSchema)
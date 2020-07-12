const mongoose = require('mongoose')

const billSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  products: String
})

module.exports = mongoose.model('bill', billSchema)
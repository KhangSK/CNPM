const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  stall: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'stalls'
  }
})

module.exports = mongoose.model('product', productSchema)
const mongoose = require('mongoose')

const moment = require('moment-timezone');
const date = moment.tz(Date.now(), "Asia/Bangkok");

const billSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  products: String,
  createdAt: {
    type: Date,
    default: date
  }
})

module.exports = mongoose.model('bill', billSchema)
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  // address: String,
  // phoneNumber: String,
  role: {
    type: String,
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('user', userSchema)

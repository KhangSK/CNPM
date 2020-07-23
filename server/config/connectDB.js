const mongoose = require('mongoose')

module.exports = () => {
    try {
        mongoose.connect('mongodb://localhost:27017/restaurant',
            { useNewUrlParser: true, useUnifiedTopology: true }, () => {
                console.log('MongoDB Connected')
            })
    } catch (err) {
        console.log(err)
    }
}
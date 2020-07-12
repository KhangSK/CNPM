const mongoose = require('mongoose')

module.exports = () => {
    try {
        mongoose.connect('mongodb+srv://admin:123@cluster0-ljkqx.mongodb.net/test_restaurant?retryWrites=true&w=majority',
            { useNewUrlParser: true, useUnifiedTopology: true }, () => {
                console.log('MongoDB Connected')
            })
    } catch (err) {
        console.log(err)
    }
}
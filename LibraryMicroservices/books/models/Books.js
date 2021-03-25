const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({

    title:{
        type: String,
        require: true,
    },
    author: {
        type: String,
        require: true,
    },
    numberOfPages: {
        type: Number,
        require: false
    },
    publisher: {
        type: String,
        require: false
    }

})

const Books = mongoose.model('Books', bookSchema)
module.exports = Books
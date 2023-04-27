const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'Anonymous'
    }
}, {timestamps: true})
// timestamps store time to server


module.exports = mongoose.model('book', bookSchema)
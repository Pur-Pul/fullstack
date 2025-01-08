const mongoose = require('mongoose')
const book_schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  published: {
    type: Number
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'author'
  },
  genres: [
    {
      type: String
    }
  ]
})
module.exports = mongoose.model('book', book_schema)
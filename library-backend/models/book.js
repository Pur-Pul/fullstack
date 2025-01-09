const mongoose = require('mongoose')
const book_schema = new mongoose.Schema({
  title: { type: String, minLength: 5, required: true },
  published: { type: Number },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'author' },
  genres: [{ type: String, minLength: 3 }]
})
module.exports = mongoose.model('book', book_schema)
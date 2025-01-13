const mongoose = require('mongoose')
const author_schema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5 },
  born: { type: Number },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'book' }],
})
module.exports = mongoose.model('author', author_schema)
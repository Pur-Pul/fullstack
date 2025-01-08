const mongoose = require('mongoose')
const author_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  born: {
    type: Number
  },
})
module.exports = mongoose.model('author', author_schema)
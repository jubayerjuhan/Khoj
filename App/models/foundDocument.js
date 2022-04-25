const mongoose = require('mongoose')


const foundDocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  documentType: {
    type: String,
    required: true
  },
  caption: {
    type: String,
  },
  found: {
    type: Boolean,
    default: true,
  }
})

module.exports = mongoose.model('foundDocument', foundDocumentSchema);
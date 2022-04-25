const mongoose = require('mongoose')


const lostDocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  documentType: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  documentNumber: {
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
  nidNo: {
    type: Number,
    required: true
  },
  gdNo: {
    type: String,
  },
  caption: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('lost_document', lostDocumentSchema);
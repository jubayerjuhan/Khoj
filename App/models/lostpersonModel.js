const mongoose = require('mongoose')


const lostPersonSchema = new mongoose.Schema({
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
  returnAddress: {
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
  relation: {
    type: String,
    required: true
  },
  gdNo: {
    type: String,
  },
  caption: {
    type: String,
  },
  found: {
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('lostPerson', lostPersonSchema);
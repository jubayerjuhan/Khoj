const mongoose = require('mongoose')


const foundPersonSchema = new mongoose.Schema({
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
  caption: {
    type: String,
  },
  user: {
    type: Object,
  },
  user: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  found: {
    type: Boolean,
    default: true,
  }
})

module.exports = mongoose.model('foundPerson', foundPersonSchema);
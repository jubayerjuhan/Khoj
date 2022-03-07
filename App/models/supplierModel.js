const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  focalName: {
    type: String,
    required: true,
  },
  focalPersonDesignation: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
})


const Supplier = mongoose.model('supplier', supplierSchema)

module.exports = Supplier;
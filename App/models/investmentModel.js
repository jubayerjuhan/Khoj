const mongoose = require('mongoose');

const investmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  paymentDate: {
    type: Date,
    required: true,
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
  cashCarriedPerson: {
    type: String,
    required: true,
  }
});

const Investment = mongoose.model('investment', investmentSchema);
module.exports = Investment;
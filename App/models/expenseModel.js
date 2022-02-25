const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
  supplier: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  recivedItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  }
})


const Expense = mongoose.model('expense', expenseSchema)

module.exports = Expense;
const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  customerType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  paymentMethod: {
    type: String,
    required: true,
  },

  saleItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    }
  ],
  purchasePrice: {
    type: Number,
    required: true
  },
  priceBreakdown: {
    subtotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    }
  },
  note: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }

});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
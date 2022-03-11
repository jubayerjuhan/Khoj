const Sale = require("../models/salemodel.js");
const catchAsyncError = require("../Utils/catchAsyncError.js");
const moment = require("moment");
const Product = require("../models/productmodel.js");

exports.addSale = catchAsyncError(async (req, res, next) => {
  const {
    customerType,
    purchasePrice,
    name,
    paymentMethod,
    saleItems,
    priceBreakdown,
    note,
  } = req.body;


  const changeStock = async (item) => {
    const product = await Product.findById(item.product);
    product.stock = product.stock - item.quantity;
    await product.save();
  }


  saleItems.forEach(item => {
    changeStock(item);
  });
  const sale = new Sale({
    customerType,
    name,
    purchasePrice,
    paymentMethod,
    saleItems,
    priceBreakdown,
    note
  });
  await sale.save();
  res.status(201).json({
    success: true,
    sale,
  });

})


exports.getAllSale = catchAsyncError(async (req, res, next) => {
  const { date } = req.body;
  const { today, week, time } = req.query;


  if (date) {
    const sale = await Sale.find({ createdAt: { $gte: Date.parse(date.fromDate), $lte: Date.parse(date.toDate) } }).populate("saleItems.product");
    return res.status(200).json({
      success: true,
      sale,
    });
  }
  if (today) {
    const sale = await Sale.find({ createdAt: { $gte: moment().startOf('day') } }).populate("saleItems.product");
    return res.status(200).json({
      success: true,
      sale,
    });
  }
  if (week) {
    const day = new Date();
    day.setDate(day.getDate() - 7);
    const sale = await Sale.find({ createdAt: { $gte: day } }).populate("saleItems.product");
    return res.status(200).json({
      success: true,
      sale,
    });
  }

  const day = new Date();
  day.setDate(day.getDate() - 7);
  const sale = await Sale.find().populate("saleItems.product");
  return res.status(200).json({
    success: true,
    sale,
  });

})



exports.getSingleSale = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const sale = await Sale.findById(id).populate("saleItems.product");
  res.status(201).json({
    success: true,
    sale,
  });
})
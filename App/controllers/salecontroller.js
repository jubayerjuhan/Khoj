const Sale = require("../models/salemodel.js");
const catchAsyncError = require("../Utils/catchAsyncError.js");
const moment = require("moment");

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
  const { time } = req.query;

  if (time === 'today') {
    const startOfDay = moment().startOf('day').toDate();
    const endOfDay = moment().endOf('day').toDate();
    const sale = await Sale.find({ createdAt: { $gte: startOfDay, $lte: endOfDay } }).populate("saleItems.product");
    return res.status(200).json({
      success: true,
      sale,
      today: startOfDay,
    });
  }

  if (time === 'week') {
    const day = new Date();
    day.setDate(day.getDate() - 7);

    const sale = await Sale.find({ createdAt: { $gte: day } }).populate("saleItems.product");
    return res.status(200).json({
      success: true,
      sale,
    });
  }

  if (time === 'month') {
    const day = new Date();
    day.setDate(day.getDate() - 30);
    console.log(day);

    const sale = await Sale.find({ createdAt: { $gte: day } }).populate("saleItems.product");
    return res.status(200).json({
      success: true,
      sale,
    });
  }

  const sale = await Sale.find().populate("saleItems.product");
  res.status(201).json({
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
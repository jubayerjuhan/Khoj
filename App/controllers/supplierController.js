const Supplier = require("../models/supplierModel.js");
const catchAsyncError = require("../Utils/catchAsyncError.js");

exports.createSupplier = catchAsyncError(async (req, res, next) => {
  const supplier = await Supplier.create(req.body);
  res.status(200).json({
    success: true,
    supplier,
  });
})
exports.getSupplier = catchAsyncError(async (req, res, next) => {
  const supplier = await Supplier.find({})
  res.status(200).json({
    success: true,
    suppliers: supplier,
  });
})
const Investment = require("../models/investmentModel.js");
const catchAsyncError = require("../Utils/catchAsyncError.js");

exports.createInvestment = catchAsyncError(async (req, res, next) => {
  const {
    name,
    paymentType,
    paymentDate,
    paymentAmount,
    cashCarriedPerson
  } = req.body;

  const investment = await new Investment({
    name,
    paymentType,
    paymentDate,
    paymentAmount,
    cashCarriedPerson
  }).save();

  res.status(201).json({
    success: true,
    investment,
  });
})

exports.getInvestments = catchAsyncError(async (req, res, next) => {
  const investments = await Investment.find();

  res.status(200).json({
    success: true,
    investments,
  });
})
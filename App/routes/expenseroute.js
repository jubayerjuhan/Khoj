const express = require('express');
const { addExpense, getAllExpense } = require('../controllers/expenseController.js');
const { createInvestment, getInvestments } = require('../controllers/investmentController.js');
const router = express.Router()
const { authorizeAdmin, authorizeUser } = require('../middleware/authorizeUser.js')


router.route('/expense/new').post(authorizeUser, authorizeAdmin, addExpense)
router.route('/expense/all').get(authorizeUser, authorizeAdmin, getAllExpense)

// invest
router.route('/investment').post(authorizeUser, authorizeAdmin, createInvestment)
  .get(authorizeUser, authorizeAdmin, getInvestments)


module.exports = router


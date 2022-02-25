const express = require('express');
const { addExpense, getAllExpense } = require('../controllers/expenseController.js');
const router = express.Router()
const { authorizeAdmin, authorizeUser } = require('../middleware/authorizeUser.js')


router.route('/expense/new').post(authorizeUser, authorizeAdmin, addExpense)
router.route('/expense/all').get(authorizeUser, authorizeAdmin, getAllExpense)


module.exports = router


const express = require('express');
const { createInvestment, getInvestments } = require('../controllers/investmentController.js');
const { authorizeUser, authorizeAdmin } = require('../middleware/authorizeUser.js');
const router = express.Router();

router.route('/investment').post(authorizeUser, authorizeAdmin, createInvestment)
  .get(authorizeUser, authorizeAdmin, getInvestments)

module.exports = router


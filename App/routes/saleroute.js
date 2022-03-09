const express = require('express');
const { addSale, getAllSale, getSingleSale } = require('../controllers/salecontroller.js');
const { authorizeUser, authorizeAdmin } = require('../middleware/authorizeUser.js');
const router = express.Router();

router.route('/sale/new').post(authorizeUser, authorizeAdmin, addSale);
router.route('/sale/all').post(authorizeUser, authorizeAdmin, getAllSale);
router.route('/sale/:id').get(authorizeUser, authorizeAdmin, getSingleSale);


module.exports = router;
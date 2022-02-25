const express = require('express');
const { addCategory, getAllCategory, getCategoryName } = require('../controllers/categoryController.js');
const { authorizeUser, authorizeAdmin } = require('../middleware/authorizeUser.js');
const router = express.Router();

router.route('/category/new').post(authorizeUser, authorizeAdmin, addCategory)
router.route('/category/all').get(authorizeUser, authorizeAdmin, getAllCategory)

module.exports = router;
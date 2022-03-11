const express = require('express');
const { addProduct, getProducts, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController.js');
const { createSupplier, getSupplier } = require('../controllers/supplierController.js');
const { authorizeUser, authorizeAdmin } = require('../middleware/authorizeUser.js');
const router = express.Router();

router.route('/product/new').post(authorizeUser, authorizeAdmin, addProduct);
router.route('/product/all').get(authorizeUser, authorizeAdmin, getProducts);
router.route('/product/single/:id').get(authorizeUser, authorizeAdmin, getSingleProduct);
router.route('/product/edit/:id').post(authorizeUser, authorizeAdmin, updateProduct);
router.route('/product/delete/:id').delete(authorizeUser, authorizeAdmin, deleteProduct);
router.route('/supplier').post(authorizeUser, authorizeAdmin, createSupplier).get(authorizeUser, authorizeAdmin, getSupplier);;

module.exports = router;
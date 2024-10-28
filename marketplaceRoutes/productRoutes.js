const express = require('express');
const {  authorizeRoles, isAuthenticatedUser, isAuthenticatedOwner , authorizeUserType} = require('../middleware/auth');
const { createProduct, getAllProducts, updateProduct, getProductById } = require('../marketplaceController/ProductController');

const router = express.Router();

router.route("/product").post(  isAuthenticatedUser, createProduct)
router.route("/products").get(isAuthenticatedUser ,authorizeUserType('supplier', 'buyer'), getAllProducts  )
router.route("/product/:id").put(isAuthenticatedUser ,updateProduct)


router.route("/product/:productId").get(isAuthenticatedUser,  getProductById)

module.exports = router;
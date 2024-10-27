const express = require('express');
const {  authorizeRoles, isAuthenticatedUser } = require('../middleware/auth');
const { createProduct, getAllProducts, updateProduct, getProductById } = require('../marketplaceController/ProductController');
const { createCategory, getCategoryById, getAllCategories, assignProductToCategory } = require('../marketplaceController/CategoryController');

const router = express.Router();

router.route("/category").post(  createCategory)
router.route("/categories").get(getAllCategories)
router.route("/category/:categoryId").get(getCategoryById)
router.route("/categories/productassigments").put(assignProductToCategory)

module.exports = router;
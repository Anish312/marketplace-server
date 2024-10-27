const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const getContextProductModel = require('../marketplaceModels/Product'); 
const contextDb = require("../config/contextDb");
const getContextDatabase = require("../utils/contextDatabaseContext");


// Create Product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const { name, description, price, category, productId } = req.body;
   
  const identifier = "identifier";
  const contextDatabase = getContextDatabase(identifier);
  if (!contextDatabase) {
      return res.status(500).json({
          success: false,
          message: "Could not connect to context-specific database"
      });
  }

  const Product = getContextProductModel(contextDatabase);
  const product = await Product.create({
      productId,
      name,
      description,
      price,
      category,
  });

  res.status(201).json({
      success   : true,
      product,
  });
});

// Get Product by ID
exports.getProductById = catchAsyncErrors(async (req, res, next) => {
  const identifier = "identifier";
  const contextDatabase = getContextDatabase(identifier);
  if (!contextDatabase) {
      return res.status(500).json({
          success: false,
          message: "Could not connect to context-specific database"
      });
  }

  const Product = getContextProductModel(contextDatabase);
  const { productId } = req.params;

  const product = await Product.findOne({ productId }).select('-_id'); // Use findOne for unique field

  if (!product) {
      return res.status(404).json({
          success: false,
          message: `Product not found with ID: ${productId}`
      });
  }

  res.status(200).json({
      success: true,
      product
  });
});

// Update Product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const identifier = "identifier";
  const contextDatabase = getContextDatabase(identifier);
  if (!contextDatabase) {
      return res.status(500).json({
          success: false,
          message: "Could not connect to context-specific database"
      });
  }

  const Product = getContextProductModel(contextDatabase);
  const { productId } = req.params;

  // Find the product by productId and update it
  const updatedProduct = await Product.findOneAndUpdate(
      { productId }, // Match by productId
      req.body,
      {
          new: true,
          runValidators: true
      }
  );

  if (!updatedProduct) {
      return res.status(404).json({
          success: false,
          message: `Product not found with ID: ${productId}`
      });
  }

  res.status(200).json({
      success: true,
      product: updatedProduct
  });
});

// Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const identifier = "identifier";
  const contextDatabase = getContextDatabase(identifier);
  if (!contextDatabase) {
      return res.status(500).json({
          success: false,
          message: "Could not connect to context-specific database"
      });
  }

  const Product = getContextProductModel(contextDatabase);
  const products = await Product.find().select('-_id');

  res.status(200).json({
      success: true,
      products
  });
});

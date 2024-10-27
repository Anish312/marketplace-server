// src/controllers/categoryController.js
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const getContextCategoryModel = require("../marketplaceModels/Category");
const getContextDatabase = require("../utils/contextDatabaseContext");
const getContextProductModel = require("../marketplaceModels/Product");
const { default: mongoose } = require("mongoose");

const getContextCategoryModelFromRequest = async (req, res) => {
    const identifier = "identifier"; // This should come from your logic
    const contextDatabase = getContextDatabase(identifier);
    
    if (!contextDatabase) {
        res.status(500).json({
            success: false,
            message: "Could not connect to context-specific database"
        });
        return null;
    }

    return getContextCategoryModel(contextDatabase);
};

exports.createCategory = catchAsyncErrors(async (req, res, next) => {
    const { categoryId, name } = req.body;

    const Category = await getContextCategoryModelFromRequest(req, res);
    if (!Category) return;

    // Create the category
    const category = await Category.create({
        categoryId,
        name
    });

    res.status(201).json({
        success: true,
        category,
    });
});


exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
    const Category = await getContextCategoryModelFromRequest(req, res);
    if (!Category) return;

    // Fetch all categories from the database
    const categories = await Category.find().select('-_id');

    res.status(200).json({
        success: true,
        categories
    });
});

exports.getCategoryById = catchAsyncErrors(async (req, res, next) => {
    const { categoryId } = req.params;

    const Category = await getContextCategoryModelFromRequest(req, res);
    if (!Category) return;

    // Find the category by categoryId
    const category = await Category.findOne({ categoryId }).select('-_id');
    if (!category) {
        return res.status(404).json({
            success: false,
            message: "Category not found"
        });
    }

    res.status(200).json({
        success: true,
        category
    });
});

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
    const { categoryId } = req.params;
    const { name } = req.body; // Use name instead of categoryName

    const Category = await getContextCategoryModelFromRequest(req, res);
    if (!Category) return;

    // Update the category
    const category = await Category.findOneAndUpdate(
        { categoryId },
        { name }, // Update the name field
        { new: true, runValidators: true }
    );

    if (!category) {
        return res.status(404).json({
            success: false,
            message: "Category not found"
        });
    }

    res.status(200).json({
        success: true,
        category
    });
});

exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
    const { categoryId } = req.params;

    const Category = await getContextCategoryModelFromRequest(req, res);
    if (!Category) return;

    // Find and delete the category
    const category = await Category.findOneAndDelete({ categoryId });

    if (!category) {
        return res.status(404).json({
            success: false,
            message: "Category not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Category deleted successfully"
    });
});
exports.assignProductToCategory = catchAsyncErrors(async (req, res, next) => {
    const { productId, categoryId } = req.body;

    const identifier = "identifier";
    const contextDatabase = getContextDatabase(identifier);
    if (!contextDatabase) {
        return res.status(500).json({
            success: false,
            message: "Could not connect to context-specific database"
        });
    }

    const Product = getContextProductModel(contextDatabase);
    const Category = await getContextCategoryModelFromRequest(req, res);
    if (!Product || !Category) return;

    const product = await Product.findOne({ productId });
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    const category = await Category.findOne({ categoryId });
    if (!category) {
        return res.status(404).json({
            success: false,
            message: "Category not found",
        });
    }

    // Assign the category to the product
    product.category = categoryId;
    await product.save();

    res.status(200).json({
        success: true,
        product,
    });
});

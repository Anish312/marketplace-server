const Marketplace = require('../models/Marketplace');
const catchAsyncErrors = require('../middleware/catchAsyncErrors'); // Assuming you have a middleware for handling async errors
const ErrorHandler = require('../utils/errorHandler'); // Assuming you have a custom error handler
const { spawn } = require('child_process');
let currentPort = 8000; 
// Register new marketplace
const mongoose = require('mongoose');

const contextDb = require('../config/contextDb');

exports.registerMarketplace = catchAsyncErrors(async (req, res, next) => {
    const { marketplaceName, identifier, enviroment, owner, ownerEmail, contextId } = req.body;
    const contextDatabaseName = await contextDb(identifier);
    // Step 1: Create the marketplace document in your main database
    const marketplace = await Marketplace.create({
        marketplaceName,
        identifier,
        enviroment,
        owner,
        ownerEmail,
        contextId,
        contextDatabaseName
    });

    res.status(201).json({
        success: true,
        marketplace,
        message: `New database/collection created: ${contextDatabaseName}`
    });
});

// Get single marketplace by ID
exports.getSingleMarketplace = catchAsyncErrors(async (req, res, next) => {
    const marketplace = await Marketplace.findById(req.params.id);
    
    if (!marketplace) {
      return next(new ErrorHandler('Marketplace not found', 404));
    }
   console.log(',ssss',marketplace?.identifier)
    req.session.identifier = marketplace?.identifier;  
    // Spawning a new process for marketplaceServer
    const marketplaceServer = spawn('node', ['marketplaceServer.js', currentPort], {
      stdio: 'inherit',
    });
  
    marketplaceServer.on('error', (error) => {
      console.error(`Error: ${error.message}`);
    });
  
    // Respond with marketplace and confirmation of the server spawn
    res.status(200).json({
      success: true,
      marketplace,
      message: `Marketplace server started on port ${currentPort}`,
    });
  });
  

// Update marketplace by ID
exports.updateMarketplace = catchAsyncErrors(async (req, res, next) => {
    let marketplace = await Marketplace.findById(req.params.id);

    if (!marketplace) {
        return next(new ErrorHandler('Marketplace not found', 404));
    }

    marketplace = await Marketplace.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        marketplace,
    });
});

// Delete marketplace by ID
exports.deleteMarketplace = catchAsyncErrors(async (req, res, next) => {
    const marketplace = await Marketplace.findById(req.params.id);

    if (!marketplace) {
        return next(new ErrorHandler('Marketplace not found', 404));
    }

    await marketplace.remove();

    res.status(200).json({
        success: true,
        message: 'Marketplace deleted successfully',
    });
});

// Get all marketplaces
exports.getAllMarketplaces = catchAsyncErrors(async (req, res, next) => {
    const marketplaces = await Marketplace.find();

    res.status(200).json({
        success: true,
        marketplaces,
    });
});

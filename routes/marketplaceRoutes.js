const express = require('express');
const {
    registerMarketplace,
    getSingleMarketplace,
    updateMarketplace,
    deleteMarketplace,
    getAllMarketplaces
} = require('../controllers/marketplaceController');
const { isAuthenticatedOwner, authorizeRoles } = require('../middleware/auth'); // Assuming you have auth middleware

const router = express.Router();

// Create a new marketplace
router.route('/marketplace/register').post(isAuthenticatedOwner, registerMarketplace);

// Get all marketplaces
router.route('/marketplaces').get(isAuthenticatedOwner, getAllMarketplaces);

// Get, update, delete marketplace by ID
router
    .route('/marketplace/:id')
    .get( getSingleMarketplace)
    .put(isAuthenticatedOwner, updateMarketplace)
    .delete(isAuthenticatedOwner,deleteMarketplace);

module.exports = router;

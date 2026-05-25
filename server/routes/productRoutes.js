const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products with pagination and filtering
router.get('/', productController.getProducts);

// Get single product by ID or Slug
router.get('/:idOrSlug', productController.getProduct);

// Get product categories
router.get('/categories/all', productController.getCategories);

module.exports = router;

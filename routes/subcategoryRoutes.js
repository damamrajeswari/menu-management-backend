const express = require('express');
const router = express.Router();
const subCtrl = require('../controllers/subcategoryController');

// Create subcategory under a category
router.post('/category/:categoryId', subCtrl.createSubCategory);

// Get all subcategories
router.get('/', subCtrl.getAllSubCategories);

// Get subcategories for a category
router.get('/category/:categoryId', subCtrl.getSubCategoriesByCategory);

// Get subcategory by id or name
router.get('/:idOrName', subCtrl.getSubCategory);

// Edit subcategory
router.put('/edit/:id', subCtrl.updateSubCategory);

module.exports = router;

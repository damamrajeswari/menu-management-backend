const express = require('express');
const router = express.Router();
const catCtrl = require('../controllers/categoryController');

// Create category
router.post('/', catCtrl.createCategory);

// Get all categories
router.get('/', catCtrl.getAllCategories);

// Get a category by id or name with subcategories and items
router.get('/:idOrName', catCtrl.getCategory);

// Edit category by id
router.put('/edit/:id', catCtrl.updateCategory);

module.exports = router;

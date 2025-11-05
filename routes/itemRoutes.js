const express = require('express');
const router = express.Router();
const itemCtrl = require('../controllers/itemController');

// Create item under category (or under category+subCategory)
router.post('/category/:categoryId', itemCtrl.createItem); // create under category (no sub)
router.post('/category/:categoryId/subcategory/:subCategoryId', itemCtrl.createItem); // create under subcategory

// Get all items
router.get('/', itemCtrl.getAllItems);

// Get items by category
router.get('/category/:categoryId', itemCtrl.getItemsByCategory);

// Get items by subcategory
router.get('/subcategory/:subCategoryId', itemCtrl.getItemsBySubCategory);



// Edit item
router.put('/edit/:id', itemCtrl.updateItem);

// Search items by name: /api/items/search?q=pizza
router.get('/search', itemCtrl.searchItems);

// Get item by id or name
router.get('/:idOrName', itemCtrl.getItem);

module.exports = router;

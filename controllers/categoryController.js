const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const Item = require('../models/Item');

// Create a category
exports.createCategory = async (req, res, next) => {
  try {
    const { name, image, description, taxApplicable=false, tax=0, taxType='none' } = req.body;
    const cat = new Category({ name, image, description, taxApplicable, tax, taxType });
    await cat.save();
    res.status(201).json(cat);
  } catch (err) {
    next(err);
  }
};

// Get all categories
exports.getAllCategories = async (req, res, next) => {
  try {
    const cats = await Category.find().lean();
    res.json(cats);
  } catch (err) {
    next(err);
  }
};

// Get a category by id or name including its subcategories and items
exports.getCategory = async (req, res, next) => {
  try {
    const { idOrName } = req.params;
    let category;
    if (mongooseId(idOrName)) {
      category = await Category.findById(idOrName).lean();
    } else {
      category = await Category.findOne({ name: idOrName }).lean();
    }
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const subcategories = await SubCategory.find({ category: category._id }).lean();
    const items = await Item.find({ category: category._id }).lean();

    res.json({ ...category, subcategories, items });
  } catch (err) {
    next(err);
  }
};

// Simple helper to check ObjectId-ish string
function mongooseId(str) {
  return /^[0-9a-fA-F]{24}$/.test(str);
}

// Edit category
exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const updated = await Category.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Category not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

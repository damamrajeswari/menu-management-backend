const SubCategory = require('../models/SubCategory');
const Category = require('../models/Category');
const Item = require('../models/Item');

exports.createSubCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { name, image, description, taxApplicable, tax } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: 'Parent category not found' });

    // If tax fields not provided, default to category values
    const finalTaxApplicable = (typeof taxApplicable === 'boolean') ? taxApplicable : category.taxApplicable;
    const finalTax = (typeof tax === 'number') ? tax : category.tax;

    const sub = new SubCategory({
      name, image, description, category: category._id,
      taxApplicable: finalTaxApplicable, tax: finalTax
    });
    await sub.save();
    res.status(201).json(sub);
  } catch (err) {
    next(err);
  }
};

exports.getAllSubCategories = async (req, res, next) => {
  try {
    const subs = await SubCategory.find().populate('category', 'name').lean();
    res.json(subs);
  } catch (err) {
    next(err);
  }
};

exports.getSubCategoriesByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const subs = await SubCategory.find({ category: categoryId }).lean();
    res.json(subs);
  } catch (err) { next(err); }
};

exports.getSubCategory = async (req, res, next) => {
  try {
    const { idOrName } = req.params;
    let sub;
    if (/^[0-9a-fA-F]{24}$/.test(idOrName)) sub = await SubCategory.findById(idOrName).lean();
    else sub = await SubCategory.findOne({ name: idOrName }).lean();
    if (!sub) return res.status(404).json({ message: 'SubCategory not found' });

    const items = await Item.find({ subCategory: sub._id }).lean();
    res.json({ ...sub, items });
  } catch (err) { next(err); }
};

exports.updateSubCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await SubCategory.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'SubCategory not found' });
    res.json(updated);
  } catch (err) { next(err); }
};

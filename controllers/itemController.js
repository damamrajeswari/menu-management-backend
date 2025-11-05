const Item = require('../models/Item');
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');

exports.createItem = async (req, res, next) => {
  try {
    const { categoryId, subCategoryId } = req.params;
    const {
      name, image, description, taxApplicable, tax,
      baseAmount, discount = 0
    } = req.body;

    // Validate category
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    // subcategory is optional; if provided, validate
    let subCategory = null;
    if (subCategoryId) {
      subCategory = await SubCategory.findById(subCategoryId);
      if (!subCategory) return res.status(404).json({ message: 'SubCategory not found' });
    }

    // use provided tax flags or inherit from subcategory -> category
    let finalTaxApplicable = typeof taxApplicable === 'boolean' ? taxApplicable
      : (subCategory ? (typeof subCategory.taxApplicable === 'boolean' ? subCategory.taxApplicable : category.taxApplicable) : category.taxApplicable);

    let finalTax = typeof tax === 'number' ? tax
      : (subCategory ? (typeof subCategory.tax === 'number' ? subCategory.tax : category.tax) : category.tax);

    const item = new Item({
      name,
      image,
      description,
      category: category._id,
      subCategory: subCategory ? subCategory._id : undefined,
      taxApplicable: finalTaxApplicable,
      tax: finalTax,
      baseAmount,
      discount
    });

    await item.save();
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

exports.getAllItems = async (req, res, next) => {
  try {
    const items = await Item.find().populate('category', 'name').populate('subCategory', 'name').lean();
    res.json(items);
  } catch (err) { next(err); }
};

exports.getItemsByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const items = await Item.find({ category: categoryId }).populate('subCategory', 'name').lean();
    res.json(items);
  } catch (err) { next(err); }
};

exports.getItemsBySubCategory = async (req, res, next) => {
  try {
    const { subCategoryId } = req.params;
    const items = await Item.find({ subCategory: subCategoryId }).lean();
    res.json(items);
  } catch (err) { next(err); }
};

exports.getItem = async (req, res, next) => {
  try {
    const { idOrName } = req.params;
    let item;
    if (/^[0-9a-fA-F]{24}$/.test(idOrName)) item = await Item.findById(idOrName).lean();
    else item = await Item.findOne({ name: idOrName }).lean();
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) { next(err); }
};

exports.updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Item.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Item not found' });
    // recompute totalAmount if base or discount changed
    await updated.save();
    res.json(updated);
  } catch (err) { next(err); }
};

// search items by name (case-insensitive partial)
exports.searchItems = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: 'Query parameter q is required' });

    const items = await Item.find({ name: { $regex: q, $options: 'i' } })
      .limit(50)
      .lean();
    res.json(items);
  } catch (err) { next(err); }
};

const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  // inherit defaults from category if not provided
  taxApplicable: { type: Boolean },
  tax: { type: Number },
}, { timestamps: true });

// optional: create a compound index to keep names unique per category
SubCategorySchema.index({ name: 1, category: 1 }, { unique: true });

module.exports = mongoose.model('SubCategory', SubCategorySchema);

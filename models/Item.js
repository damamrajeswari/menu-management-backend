const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }, // optional
  taxApplicable: { type: Boolean },
  tax: { type: Number, default: 0 },
  baseAmount: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number } // we will compute before save
}, { timestamps: true });

// compute total before save
ItemSchema.pre('save', function(next) {
  // ensure numeric values
  const base = Number(this.baseAmount || 0);
  const discount = Number(this.discount || 0);
  this.totalAmount = Math.max(0, base - discount);
  next();
});

module.exports = mongoose.model('Item', ItemSchema);

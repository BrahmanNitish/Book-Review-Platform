const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  reviewText: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);

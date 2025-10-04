const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  const { bookId, rating, reviewText } = req.body;
  const review = new Review({
    bookId,
    userId: req.user._id,
    rating,
    reviewText
  });
  const createdReview = await review.save();
  res.status(201).json(createdReview);
};

exports.getReviewsByBook = async (req, res) => {
  const reviews = await Review.find({ bookId: req.params.bookId }).populate('userId', 'name');
  const avgRating = reviews.length ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(2) : 0;
  res.json({ reviews, avgRating });
};

exports.updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });
  if (review.userId.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  const { rating, reviewText } = req.body;
  review.rating = rating;
  review.reviewText = reviewText;
  const updatedReview = await review.save();
  res.json(updatedReview);
};

exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });
  if (review.userId.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  await review.remove();
  res.json({ message: 'Review removed' });
};

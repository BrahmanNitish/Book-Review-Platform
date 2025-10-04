const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
} = require('../controllers/bookController');

router.route('/')
  .get(getBooks)
  .post(protect, addBook);

router.route('/:id')
  .get(getBookById)
  .put(protect, updateBook)
  .delete(protect, deleteBook);

module.exports = router;

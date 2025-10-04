const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  const { title, author, description, genre, year } = req.body;
  const book = new Book({
    title,
    author,
    description,
    genre,
    year,
    addedBy: req.user._id
  });
  const createdBook = await book.save();
  res.status(201).json(createdBook);
};

exports.getBooks = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = 5;
  const count = await Book.countDocuments();
  const books = await Book.find()
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .sort({ createdAt: -1 });
  res.json({ books, page, pages: Math.ceil(count / pageSize) });
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

exports.updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  if (book.addedBy.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  const { title, author, description, genre, year } = req.body;
  book.title = title;
  book.author = author;
  book.description = description;
  book.genre = genre;
  book.year = year;
  const updatedBook = await book.save();
  res.json(updatedBook);
};

exports.deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  if (book.addedBy.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  await book.remove();
  res.json({ message: 'Book removed' });
};

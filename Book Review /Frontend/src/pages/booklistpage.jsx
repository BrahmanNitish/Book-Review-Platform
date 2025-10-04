import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchBooks = async (pageNum = 1) => {
    const { data } = await API.get(`/books?page=${pageNum}`);
    setBooks(data.books);
    setPage(data.page);
    setPages(data.pages);
  };

  useEffect(() => { fetchBooks(); }, []);

  const handlePageChange = (newPage) => {
    fetchBooks(newPage);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <Link to="/add" className="bg-blue-500 text-white p-2 mb-4 inline-block">Add Book</Link>
      <ul className="space-y-4">
        {books.map(book => (
          <li key={book._id} className="border p-4 rounded">
            <Link to={`/book/${book._id}`} className="text-xl font-semibold">{book.title}</Link>
            <p className="text-gray-600">by {book.author}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center space-x-2">
        {[...Array(pages).keys()].map(x => (
          <button
            key={x+1}
            onClick={() => handlePageChange(x+1)}
            className={`p-2 border ${page===x+1 ? 'bg-gray-300' : ''}`}
          >{x+1}</button>
        ))}
      </div>
    </div>
  );
};

export default BookListPage;

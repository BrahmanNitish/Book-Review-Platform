import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import { AuthContext } from '../context/AuthContext';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const { user } = useContext(AuthContext);

  const fetchBook = async () => {
    const { data } = await API.get(`/books/${id}`);
    setBook(data);
  };

  const fetchReviews = async () => {
    const { data } = await API.get(`/reviews/${id}`);
    setReviews(data.reviews);
    setAvgRating(data.avgRating);
  };

  useEffect(() => {
    fetchBook();
    fetchReviews();
  }, [id]);

  const submitReview = async () => {
    if (!user) return alert('Login first');
    await API.post('/reviews', { bookId: id, rating, reviewText });
    setReviewText('');
    fetchReviews();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p className="text-gray-600 mb-2">by {book.author}</p>
      <p>{book.description}</p>
      <p className="mt-2">Genre: {book.genre} | Year: {book.year}</p>
      <p className="mt-2 font-semibold">Average Rating: {avgRating}</p>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Reviews</h2>
        {reviews.map(r => (
          <div key={r._id} className="border p-2 rounded mb-2">
            <p className="font-semibold">{r.userId.name}</p>
            <p>Rating: {r.rating}</p>
            <p>{r.reviewText}</p>
          </div>
        ))}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Add Review</h3>
          <select value={rating} onChange={e => setRating(Number(e.target.value))} className="border p-1 mb-2">
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} className="w-full border p-2 mb-2"/>
          <button onClick={submitReview} className="bg-green-500 text-white p-2">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;

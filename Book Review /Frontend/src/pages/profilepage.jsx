import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/api';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (user) {
      API.get('/books').then(res => setBooks(res.data.books.filter(b => b.addedBy === user._id)));
      API.get('/reviews').then(res => setReviews(res.data.filter(r => r.userId._id === user._id)));
    }
  }, [user]);

  if (!user) return <p>Please login to view profile</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Profile: {user.name}</h1>
      <h2 className="text-xl font-semibold mb-2">Your Books</h2>
      {books.map(b => <div key={b._id} className="border p-2 mb-2">{b.title}</div>)}

      <h2 className="text-xl font-semibold mt-4 mb-2">Your Reviews</h2>
      {reviews.map(r => <div key={r._id} className="border p-2 mb-2">{r.reviewText} (Rating: {r.rating})</div>)}
    </div>
  );
};

export default ProfilePage;

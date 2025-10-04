import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/api';
import { AuthContext } from '../context/AuthContext';

const AddEditBookPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      API.get(`/books/${id}`).then(res => {
        const book = res.data;
        setTitle(book.title);
        setAuthor(book.author);
        setDescription(book.description);
        setGenre(book.genre);
        setYear(book.year);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = { title, author, description, genre, year };
    if (id) {
      await API.put(`/books/${id}`, bookData);
    } else {
      await API.post('/books', bookData);
    }
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Book' : 'Add Book'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} className="w-full border p-2"/>
        <input type="text" placeholder="Author" value={author} onChange={e=>setAuthor(e.target.value)} className="w-full border p-2"/>
        <input type="text" placeholder="Genre" value={genre} onChange={e=>setGenre(e.target.value)} className="w-full border p-2"/>
        <input type="number" placeholder="Year" value={year} onChange={e=>setYear(e.target.value)} className="w-full border p-2"/>
        <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} className="w-full border p-2"/>
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">{id ? 'Update' : 'Add'} Book</button>
      </form>
    </div>
  );
};

export default AddEditBookPage;

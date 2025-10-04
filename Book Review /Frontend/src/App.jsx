import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import BookListPage from './pages/BookListPage';
import BookDetailsPage from './pages/BookDetailsPage';
import AddEditBookPage from './pages/AddEditBookPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<BookListPage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="/add" element={<AddEditBookPage />} />
          <Route path="/edit/:id" element={<AddEditBookPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

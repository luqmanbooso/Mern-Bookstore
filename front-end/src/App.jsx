import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ShowBook from './pages/ShowBook.jsx';
import CreateBooks from './pages/CreateBooks.jsx';
import DeleteBook from './pages/DeleteBook.jsx';
import EditBook from './pages/EditBook.jsx';
import Login from './components/login/index.jsx';
import Signup from './components/signup/index.jsx';
import UserHome from './pages/UserHome.jsx';
import ViewUser from './components/home/ViewUser.jsx';
import LandingPage from './pages/LandingPage.jsx';
import './index.css'; // Ensure Tailwind CSS is included

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/usersh" element={<UserHome />} />
      <Route path="/usersh/details/:id" element={<ViewUser />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/books/create" element={<CreateBooks />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
      <Route path="/home" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
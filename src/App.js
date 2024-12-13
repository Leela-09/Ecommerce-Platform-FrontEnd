import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './Pages/Home.js';

import Login from './Pages/login.js';
import Cart from './Pages/Cart.js';
import Checkout from './Pages/Checkout.js';
import Profile from './Pages/Profile.js'; // Ensure Profile is imported with the correct case


const App = () => {
  return (
    <Router>
      <h1></h1>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
   
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

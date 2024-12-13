import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserShield, faBox, faSignInAlt, faShoppingCart, faCreditCard, faUser } from '@fortawesome/free-solid-svg-icons';

// Individual Button Components
const HomeButton = () => (
  <Link to="/" className="nav-button">
    <FontAwesomeIcon icon={faHome} /> Home
  </Link>
);



const CartButton = () => (
  <Link to="/cart" className="nav-button">
    <FontAwesomeIcon icon={faShoppingCart} /> Cart
  </Link>
);

const CheckoutButton = () => (
  <Link to="/checkout" className="nav-button">
    <FontAwesomeIcon icon={faCreditCard} /> Checkout
  </Link>
);

const ProfileButton = () => (
  <Link to="/profile" className="nav-button">
    <FontAwesomeIcon icon={faUser} /> Profile
  </Link>
  
);
const ContectButton = () => (
  <Link to="/Contect" className="nav-button">
    <FontAwesomeIcon icon={faUser} /> Contect
  </Link>
  
);

const LoginButton = () => (
  <Link to="/login" className="nav-button login-button">
    <FontAwesomeIcon icon={faSignInAlt} /> Login
  </Link>
);


const Header = () => {
  return (
    <header>
      <nav>
        <div className="nav-left">
          <HomeButton />
      
          <CartButton />
          <CheckoutButton />
          <ProfileButton />
        </div>

        <div className="nav-right">
          <LoginButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;

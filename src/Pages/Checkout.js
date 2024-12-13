import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [userDetails, setUserDetails] = useState({ name: '', address: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOrderPlacement = () => {
    if (!userDetails.name || !userDetails.address) {
      alert('Please provide shipping information');
      return;
    }

    const orderData = {
      user: userDetails,
      items: cart,
      total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
    };

    console.log('Order Data:', orderData);

    alert('Order placed successfully!');
    localStorage.removeItem('cart');
    setCart([]);
    navigate('/');
  };

  // Handle item removal from the cart
  const removeItemFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item._id !== itemId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="wrapper">
      <div className="checkout-container">
        <h2>Checkout</h2>
        <div className="shipping-info">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />
          </label>
          <br />
          <label>
            Address:
            <textarea
              name="address"
              value={userDetails.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
            />
          </label>
        </div>
        <h3>Your Order</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <h4>{item.name}</h4>
                <img
                  src={item.image || 'default-image-url.jpg'} // Use a fallback image if `item.image` is unavailable
                  alt={item.name}
                />
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                {/* Delete Button */}
                <button onClick={() => removeItemFromCart(item._id)} >
                  Delete
                </button>
              </div>
            ))}
            <div className="total">
              <h3>
                Total: $
                {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
              </h3>
            </div>
          </div>
        )}
      <button
  onClick={handleOrderPlacement}
  disabled={cart.length === 0}
  style={{ marginTop: '20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}
>
  Place Order
</button>

      </div>
    </div>
  );
};

export default Checkout;
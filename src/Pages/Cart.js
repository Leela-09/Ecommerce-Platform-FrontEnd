import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]); // Ensure cart is initialized as an empty array
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Fetch cart from localStorage and parse it. If it's null or undefined, set it to an empty array.
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleCheckoutClick = () => {
    // Navigate to the checkout page when the button is clicked
    navigate('/checkout');
  };

  const backToProducts = () => {
    // Navigate to the products page when the button is clicked
    navigate('/');
  };

  // Increase product quantity in the cart
  const increaseQuantity = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart to localStorage
      return updatedCart;
    });
  };

  // Decrease product quantity in the cart
  const decreaseQuantity = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart to localStorage
      return updatedCart;
    });
  };

  // Remove item from the cart
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart to localStorage
      return updatedCart;
    });
  };

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img
                src={item.image || 'default-image-url.jpg'} // Fallback image if no image is available
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>Price: ${item.price}</p>

                <div className="quantity-section">
                  <p>Quantity:</p>
                  <button onClick={() => decreaseQuantity(item._id)}>-</button>
                  <p>{item.quantity}</p>
                  <button onClick={() => increaseQuantity(item._id)}>+</button>
                </div>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item._id)} className="remove-button">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>
              Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </h3>
          </div>
        </div>
      )}

      <button onClick={handleCheckoutClick} className="checkout-button">Proceed to Checkout</button>
      <button onClick={backToProducts} className="back-to-products-button">Back to Products</button>
    </div>
  );
};

export default Cart;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
  const [products, setProducts] = useState([]); // Store all products
  const [filteredProducts, setFilteredProducts] = useState([]); // Store filtered products
  const [searchQuery, setSearchQuery] = useState(''); // Store search query
  const [categoryFilter, setCategoryFilter] = useState(''); // Store selected category
  const [categories, setCategories] = useState([]); // Store category options
  const [error, setError] = useState(''); // Store error message
  const [selectedProduct, setSelectedProduct] = useState(null); // Store selected product for details
  const navigate = useNavigate();

  // Fetch products and categories from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5003/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filteredProducts

        // Get unique categories from products
        const categories = [...new Set(response.data.map(product => product.category))];
        setCategories(categories);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on search query and category
  useEffect(() => {
    const filter = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (categoryFilter === '' || product.category === categoryFilter)
    );
    setFilteredProducts(filter);
  }, [searchQuery, categoryFilter, products]);

  // Add product to cart
  const addToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = storedCart.find((item) => item._id === product._id);

    if (existingProduct) {
      const updatedCart = storedCart.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      storedCart.push({ ...product, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(storedCart));
    }
    alert(`${product.name} has been added to your cart!`);
    navigate('/cart');
  };

  // Show product details
  const showProductDetails = (product) => {
    setSelectedProduct(product);
  };

  // Go back to the product list
  const backToProducts = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      {/* Render the appropriate heading based on whether a product is selected */}
      <h2>{selectedProduct ? 'Product' : 'Product List'}</h2>

      {error && <p>{error}</p>}

      {/* Render the product list and search bar only when no product is selected */}
      {!selectedProduct && (
        <div>
          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Category Filter */}
          <div className="category-filter">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Product List */}
          <div className="product-list">
            {filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <img
                  src={product.image || 'default-image-url.jpg'}
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
                <button onClick={() => showProductDetails(product)}>View Details</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Render the product details only when a product is selected */}
      {selectedProduct && (
        <div className="product-detail">
          <h3>{selectedProduct.name}</h3>
          <img
            src={selectedProduct.image || 'default-image-url.jpg'}
            alt={selectedProduct.name}
            className="product-image"
          />
          <p>{selectedProduct.description}</p>
          <p>Price: ${selectedProduct.price}</p>
          <p>Brand: {selectedProduct.brand}</p>
          <p>Category: {selectedProduct.category}</p>
          <p>Ratings: {selectedProduct.ratings}</p>
          <p>Quality: {selectedProduct.quality}</p>
          <p>Features: {selectedProduct.features.join(", ")}</p>
          <p>Befint: {selectedProduct.befint}</p>
          <p>Icons: {selectedProduct.icons.join(", ")}</p>
          <button onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
          <button onClick={backToProducts}>Back to Products</button>
        </div>
      )}
    </div>
  );
};

export default Product;

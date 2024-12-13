import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Header = (props) => {
  // Function to get the user's login data from local storage
  const getUserLoginData = () => {
    const token = localStorage.getItem("E-commerce Application for Organic Dog Treats");
    if (!token) return false;

    try {
      return jwtDecode(token);
    } catch {
      localStorage.removeItem("E-commerce Application for Organic Dog Treats");
      return false;
    }
  };

  // State to manage the user's login status
  const [user, setUser] = useState(getUserLoginData());

  // Success callback for Google login
  const onSuccess = (response) => {
    const token = response.credential;
    localStorage.setItem("E-commerce Application for Organic Dog Treats", token);
    setUser(jwtDecode(token)); // Update user state to reflect login
    alert("Login successful");
  };

  // Error callback for Google login
  const onError = () => {
    alert("Login Failed");
  };

  // Logout function to remove user data and reset state
  const logout = () => {
    localStorage.removeItem("E-commerce Application for Organic Dog Treats");
    setUser(false); // Update state to logged-out
    alert("Logout successful");
  };

  useEffect(() => {
    // Re-check the login status when the component mounts
    setUser(getUserLoginData());
  }, []);

  return (
    <GoogleOAuthProvider clientId="656627861930-pm0ffbga0fp6lbovj4qjbgfkf518ca0r.apps.googleusercontent.com">
      <header>
        <nav className="login-container">
          {/* If user is logged in, show the welcome message and logout button */}
          {user ? (
            <div className="login-btn">
              <span className="fw-bold text-white">
                Welcome, {user.email.split("@")[0]}
              </span>
              <button onClick={logout} className="btn btn-outline-light ms-3 btn-sm">
                Logout
              </button>
            </div>
          ) : (
            // If user is not logged in, show the Google login button
            <GoogleLogin onSuccess={onSuccess} onError={onError} />
          )}
        </nav>
      </header>
    </GoogleOAuthProvider>
  );
};

export default Header;

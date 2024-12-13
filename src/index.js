import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 import
import '../src/css/index.css'; // Correct import for CSS
import App from './App.js';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Correct client ID for Google OAuth
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);

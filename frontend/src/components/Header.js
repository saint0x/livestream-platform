import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router for navigation
import './Header.css'; // Import CSS for styling

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Livestream Platform</Link>
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
      {/* Add user authentication or profile information if needed */}
    </header>
  );
};

export default Header;

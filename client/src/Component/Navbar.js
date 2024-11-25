import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('token');  // Check if user is logged in

  return (
    <div>
      <nav className="nav">
        <div className="container">
          <div className="logo">
            <Link to="/">YourLogo</Link>
          </div>
          <div className="main_list" id="mainListDiv">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/pspace">P-Space</Link></li>
              <li><Link to="/booking">Booking</Link></li>
              <li><Link to="/wallet">Wallet</Link></li>
              
              {isLoggedIn && <li><Link to="/profile">Profile</Link></li>} {/* Show Profile only if logged in */}
              
              <li><Link to="/contact">Contact Us</Link></li>

              {/* Conditionally render Login/Logout link */}
              {isLoggedIn ? (
                <li><Link to="/login" onClick={() => { localStorage.removeItem('token'); }}>Logout</Link></li>
              ) : (
                <li><Link to="/login">Login</Link></li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

import React from 'react'
import '../Styles/Navbar.css';
//import { Link } from'react-router-dom';
const Navbar = () => {
  return (
    <div>
      <nav class="nav">
    <div class="container">
        <div class="logo">
            <a href="#">YourLogo</a>
        </div>
        <div class="main_list" id="mainListDiv">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">P-Space</a></li>
                <li><a href="#">Booking</a></li>
                <li><a href="#">Wallet</a></li>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Contact Us</a></li>
            </ul>
        </div>
        <div class="media_button">
            <button class="main_media_button" id="mediaButton">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </div>
</nav>
    
<section class="home"></section>
    </div>
  )
}

export default Navbar;
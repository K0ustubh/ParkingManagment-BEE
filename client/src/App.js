import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Login from './Component/Login';
import Signup from './Component/SignUp';
import Profile from './Component/Profile';
import Footer from './Component/Footer';
import ParkingSpace from './Component/ParkingSpace';
import Wallet from './Component/Wallet';  // Import the Wallet component
import Contact from './Component/Contact';  // Import the Contact component

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path="/" element={<ParkingSpace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/parking-space" element={<ParkingSpace />} />
        <Route path="/wallet" element={<Wallet />} />  {/* Add Wallet route */}
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

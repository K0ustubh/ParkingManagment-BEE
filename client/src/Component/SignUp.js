import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To redirect after successful signup
import '../Styles/SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // For loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setErrorMessage('');  // Clear error message when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await fetch('http://localhost:5000/api/route/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      setLoading(false); // Stop loading

      if (response.ok) {
        navigate('/login'); // Redirect to Login after successful signup
      } else {
        setErrorMessage(result.message); // Show error message if any
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {errorMessage && <div className="message error">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;

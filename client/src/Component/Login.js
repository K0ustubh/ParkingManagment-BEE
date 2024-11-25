import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // For loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setErrorMessage('');  // Clear error message when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await fetch('http://localhost:5000/api/route/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();
      setLoading(false); // Stop loading

      if (response.ok) {
        localStorage.setItem('token', result.token); // Store JWT token in localStorage
        navigate('/'); // Redirect to Profile page after successful login
      } else {
        setErrorMessage(result.message); // Show error message if any
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {errorMessage && <div className="message error">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <input type="submit" value={loading ? 'Logging In...' : 'Login'} disabled={loading} />
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;

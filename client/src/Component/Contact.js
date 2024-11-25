import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate inputs
    if (!formData.name || !formData.email || !formData.message) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/route/contact',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        // Reset success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      console.error('Error details:', err.response?.data || err.message);
      setError(err.response?.data?.msg || 'Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Your message has been sent successfully!</p>}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn" 
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default Contact;
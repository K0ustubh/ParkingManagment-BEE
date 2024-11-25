import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Profile.css';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login'); 

      try {
        const response = await fetch('http://localhost:5000/api/route/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setUserInfo(data);
          setNewEmail(data.email);
        } else {
          setErrorMessage(data.message);
        }
      } catch (err) {
        setErrorMessage('Something went wrong.');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleUpdateEmail = async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const response = await fetch('http://localhost:5000/api/route/profile/email', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newEmail }),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage('Email updated successfully');
        setUserInfo((prev) => ({ ...prev, email: newEmail }));
      } else {
        setErrorMessage(result.message);
      }
    } catch (err) {
      setErrorMessage('Failed to update email.');
    }
  };

  const handlePasswordChange = async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const response = await fetch('http://localhost:5000/api/route/profile/password', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage('Password changed successfully');
      } else {
        setErrorMessage(result.message);
      }
    } catch (err) {
      setErrorMessage('Failed to change password.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <div className="profile">
      <h2 className="profile-heading">Profile</h2>
      {errorMessage && <div className="message error">{errorMessage}</div>}
      {successMessage && <div className="message success">{successMessage}</div>}

      <div className="profile-info">
        <p>Name:</p>
        <div className="profile-input-box">
          <input
            type="text"
            value={userInfo.name}
            readOnly
            className="profile-name"
          />
        </div>
        <p>Email:</p>
        <div className="profile-input-box">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <button onClick={handleUpdateEmail} className="btn update-btn">
          Update Email
        </button>
      </div>

      <div className="password-change">
        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handlePasswordChange} className="btn change-btn">
          Change Password
        </button>
      </div>

      <div className="actions">
        <button onClick={handleLogout} className="btn logout-btn">
          Logout
        </button>
        <button onClick={goToHomePage} className="btn homepage-btn">
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Profile;

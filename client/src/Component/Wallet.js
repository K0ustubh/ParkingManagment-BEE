// Wallet.js - Frontend
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Wallet.css';

const Wallet = () => {
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWalletDetails();
  }, [navigate]);

  const fetchWalletDetails = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5000/api/route/wallet', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWallet(response.data.data); // Updated to match backend response structure
      setError('');
    } catch (err) {
      console.error('Error fetching wallet details:', err);
      setError(err.response?.data?.error || 'Failed to load wallet details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateWallet = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.put(
        'http://localhost:5000/api/route/wallet',
        { amount: parseFloat(amount) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );

      setWallet(response.data.data); // Updated to match backend response structure
      setAmount('');
      setError('');
      // Refresh wallet details after update
      await fetchWalletDetails();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update wallet balance');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="wallet-container">Loading...</div>;
  }

  return (
    <div className="wallet-container">
      <h1>My Wallet</h1>

      {error && <div className="error-message">{error}</div>}

      {wallet && (
        <div className="wallet-content">
          <div className="wallet-details">
            <h2>Current Balance</h2>
            <p className="balance">Rs{((wallet.balance || 0)).toFixed(2)}</p>
          </div>

          <div className="wallet-update">
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Enter amount to add"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isLoading}
            />
            <button 
              onClick={handleUpdateWallet}
              disabled={isLoading || !amount}
            >
              Add Money
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
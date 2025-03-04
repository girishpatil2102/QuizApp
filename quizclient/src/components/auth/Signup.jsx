import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // For navigation after signup
import axios from 'axios'; // To make HTTP requests

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error message
    setErrorMessage('');
    setEmailError('');

    // Validate email format
    if (!emailRegex.test(email)) {
    setEmailError('Please enter a valid email address');
    return;
  }

    try {
      const response = await axios.post('http://localhost:8080/api/auth/sign-up', {
        name,
        email,
        password,
      });

      if (response.status === 200) {
         alert('Registration successful!');
        // Navigate to the login page after successful signup
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data || 'An error occurred. Please try again.');
        
      } else {
        setErrorMessage('Unable to connect to the server. Please try again.');
      }
    }
  };

  return (
    <div className="signup-container">
      <h2 className='heading'>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit" className='register-button'>Sign Up</button>

        <p className='login-option'>
          Already Registered?{' '}
          <Link to="/login" className="login-now-link">
            Login now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

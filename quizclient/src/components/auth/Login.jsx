import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setUserRole }) { // Accept setUserRole prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });

      console.log('Login successful:', response.data);

      if (response.status === 200) {
        alert('Welcome, ' + response.data.name);

        // Store user role in localStorage
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('userId', response.data.id); 
        setUserRole(response.data.role); // Update userRole state in App.jsx
        

        // Navigate to the dashboard based on role
        navigate(response.data.role === 'ADMIN' ? '/admin-dashboard' : '/user-dashboard');
      }
    } catch (err) {
      setError('Invalid credentials, please try again');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className='login-contents'>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='login-contents'>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='register-button'>Login</button>
        {error && <p className='error'>{error}</p>}
        <p className='signup-option'>
          Not Registered Yet?
          <Link to="/register" className="signup-now-link">
            Sign Up now
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

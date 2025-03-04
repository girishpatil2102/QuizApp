import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('userRole'); // Clear user session
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <h2>QuizApp</h2>
        </div>
        <div className="auth-links">
          <ul>
            {userRole === 'ADMIN' ? (
              <>
                <li><Link to="/admin-dashboard">Dashboard</Link></li>
                <li><Link to="/create-test">Create Quiz</Link></li>
                <li><Link to="/view-test-results">View Results</Link></li>
              </>
            ) : userRole === 'USER' ? (
              <>
                <li><Link to="/user-dashboard">Dashboard</Link></li>
                <li><Link to="/view-results">View Results</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Sign Up</Link></li>
              </>
            )}
            {userRole && (
              <li>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

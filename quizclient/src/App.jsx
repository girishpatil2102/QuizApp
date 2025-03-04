import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AdminDashboard from './components/admin/AdminDashboard';
import UserDashboard from './components/user/UserDashboard';
import CreateTest from './components/admin/CreateTest';
import AddQuestionInTest from './components/admin/AddQuestionInTest';
import ViewTest from './components/admin/ViewTest';
import StartTest from './components/user/StartTest';
import ViewTestResult from './components/admin/ViewTestResult';
import UserTestResult from './components/user/UserTestResult';
import TestResultPage from './components/user/TestResultPage';

function App() {

  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));


  useEffect(() => {
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem('userRole'));
    };

    const clearUserRole = () => {
      localStorage.removeItem('userRole'); // Clear local storage when closing the browser
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('beforeunload', clearUserRole); // Trigger when user leaves the page

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('beforeunload', clearUserRole);
    };
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login setUserRole={setUserRole} />} />
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/register" element={<Signup />} />

        <Route path="/admin-dashboard" element={userRole === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/user-dashboard" element={userRole === 'USER' ? <UserDashboard /> : <Navigate to="/login" />} />
        <Route path="/create-test" element={userRole === 'ADMIN' ? <CreateTest /> : <Navigate to="/login" />} />
        <Route path="/add-question/:testId" element={userRole === 'ADMIN' ? <AddQuestionInTest /> : <Navigate to="/login" />} />
        <Route path="/view-test/:testId" element={userRole === 'ADMIN' ? <ViewTest /> : <Navigate to="/login" />} />

        <Route path="/start-test/:testId" element={userRole === 'USER' ? <StartTest /> : <Navigate to="/login" />} />
        <Route path="/view-test-results" element={userRole === 'ADMIN' ? <ViewTestResult /> : <Navigate to="/login" />} />
        <Route path="/view-results" element={userRole === 'USER' ? <UserTestResult /> : <Navigate to="/login" />} />

        <Route path="/test-result" element={<TestResultPage/>} />


      </Routes>
    </Router>
  );
}

export default App;

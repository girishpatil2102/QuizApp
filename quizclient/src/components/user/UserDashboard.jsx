import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/test') // Update if needed
      .then(response => response.json())
      .then(data => setTests(data))
      .catch(error => console.error('Error fetching tests:', error));
  }, []);

  const handleStartTest = (testId) => {
    console.log(`Starting test with ID: ${testId}`);
    navigate(`/start-test/${testId}`)
  };

  return (
    <div className="user-dashboard">
      <h2>Available Quizes</h2>
      <div className="usertest-list">
        {tests.length > 0 ? (
          tests.map((test) => (
            <div key={test.id} className="usertest-card">
              <div className="usertest-details">
                <h3>{test.title}</h3>
                <p>{test.description}</p>
                <p><strong>Total Time:</strong> {Math.ceil(test.time / 60)} minutes</p>
              </div>
              <button className="start-test-button" onClick={() => handleStartTest(test.id)}>
                Start Quiz
              </button>
            </div>
          ))
        ) : (
          <p>No tests available.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

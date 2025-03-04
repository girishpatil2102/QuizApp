import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  // Fetch all tests from backend
  useEffect(() => {
    fetch('http://localhost:8080/api/test') // Update the URL if needed
      .then((response) => response.json())
      .then((data) => setTests(data))
      .catch((error) => console.error('Error fetching tests:', error));
  }, []);

  return (
    <div className="admin-dashboard">

      {tests.length > 0 ? (
        tests.map((test) => (
          <div key={test.id} className="test-card">
            <div className="test-details">
              <h2 className="test-title">{test.title}</h2>
              <p className="test-description">{test.description}</p>
              <p className="test-duration">Duration: {Math.ceil(test.time / 60)} minutes</p>
            </div>
            <div className="button-container">
              <button className="btn add-question" onClick={() => navigate(`/add-question/${test.id}`)}>
                Add Questions
              </button>
              <button className="btn view-test" onClick={() => navigate(`/view-test/${test.id}`)}>
                View Quiz
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-tests">No tests available.</p>
      )}
    </div>
  );
};

export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserTestResult() {
  const [myResults, setMyResults] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchMyResults();
  }, []);

  const fetchMyResults = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/test/test-result/${userId}`);
      setMyResults(response.data);
    } catch (error) {
      console.error('Error fetching my test results:', error);
    }
  };

  return (
    <div className='result-page'>
      <h2>My Quiz Results</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Quiz Name</th>
            <th>Correct Answers</th>
            <th>Total Questions</th>
            <th>Percentage (%)</th>
          </tr>
        </thead>
        <tbody>
          {myResults.length > 0 ? (
            myResults.map((result) => (
              <tr key={result.id}>
                <td>{result.testName}</td>
                <td>{result.correctAnswers}</td>
                <td>{result.totalQuestions}</td>
                <td>{result.percentage}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ color: 'red' }}>No Quiz results found for you.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTestResult;

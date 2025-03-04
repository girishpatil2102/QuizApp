import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewTestResult() {
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    fetchTestResults();
  }, []);

  const fetchTestResults = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/test/test-result');
      setTestResults(response.data);
    } catch (error) {
      console.error('Error fetching test results:', error);
    }
  };

  return (
    <div className='result-page' >
      <h2>Test Results</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Quiz Name</th>
            <th>User Name</th>
            <th>Correct Answers</th>
            <th>Total Questions</th>
            <th>Percentage (%)</th>
          </tr>
        </thead>
        <tbody>
          {testResults.length > 0 ? (
            testResults.map((result) => (
              <tr key={result.id}>
                <td>{result.testName}</td>
                <td>{result.userName}</td>
                <td>{result.correctAnswers}</td>
                <td>{result.totalQuestions}</td>
                <td>{result.percentage}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ color: 'red' }}>No quiz results found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewTestResult;
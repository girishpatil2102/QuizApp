import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TestResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // ⬅️ This will reset scroll to the top
  }, []);

  if (!state) {
    return (
      <div>
        <p style={{ color: 'red' }}>No result data available.</p>
        <button onClick={() => navigate("/user-dashboard")}>Back to Dashboard</button>
      </div>
    );
  }

  const { percentage, answerKey } = state;

  return (
    <div className="test-result-page">
      <h2>Quiz Result</h2>
      <p>Your Score: {percentage}%</p>

      <h3>Answer Key</h3>
      <ul className="answer-key-list">
        {answerKey.map((item, index) => (
          <li key={item.id}>
            <strong>{index + 1}. {item.questionText}</strong>
            <p>Correct Answer: {item.correctOption}</p>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/user-dashboard")}>Back to Dashboard</button>
    </div>
  );
};

export default TestResultPage;

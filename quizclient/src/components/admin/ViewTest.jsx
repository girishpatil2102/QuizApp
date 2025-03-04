import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewTest = () => {
  const { testId } = useParams(); // Get test ID from the URL
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/test/${testId}`) // Fetch test details and questions
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch test details');
        }
        return response.json();
      })
      .then((data) => {
        setTest(data.testDTO);
        setQuestions(data.questions);
      })
      .catch((error) => setError(error.message));
  }, [testId]);

  return (
    
    <div className="view-test-container">
      {error && <p className="error">{error}</p>}
      {test && <h2>{test.title}</h2>}
      {test && <p>{test.description}</p>}
      {questions.length > 0 ? (
        <>
        <ul className="question-list">
          {questions.map((question, index) => (
            <li key={question.id} className="question-item">
              <h3>{index + 1}. {question.questionText}</h3>
              <ul className="options-list">
                <li className={question.optionA === question.correctOption ? 'correct-answer' : ''}>{question.optionA}</li>
                <li className={question.optionB === question.correctOption ? 'correct-answer' : ''}>{question.optionB}</li>
                <li className={question.optionC === question.correctOption ? 'correct-answer' : ''}>{question.optionC}</li>
                <li className={question.optionD === question.correctOption ? 'correct-answer' : ''}>{question.optionD}</li>
              </ul>
              
            </li>
          ))}
        </ul>
        <button
           className="back-button"
           onClick={() => navigate("/admin-dashboard")}
          >
            Back To Dashboard
        </button>
      </>
      ) : (
        <p style={{ color: 'red' }}>No questions available for this Quiz.</p>
      )}
    </div>
    
  );
};

export default ViewTest;

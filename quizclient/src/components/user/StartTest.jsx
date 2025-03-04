import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const StartTest = () => {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [remainingTime, setRemainingTime] = useState(0);
  const isSubmittedRef = useRef(false); // Lock for submission
  const timerRef = useRef(null); // Store timer
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/test/${testId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch test details");
        }
        return response.json();
      })
      .then((data) => {
        setTest(data.testDTO);
        setQuestions(data.questions);
        setRemainingTime(data.testDTO.time); // assuming time is in seconds
      })
      .catch((error) => setError(error.message));
  }, [testId]);

  useEffect(() => {
    if (!remainingTime) return;

    timerRef.current = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [remainingTime]);

  const handleOptionChange = (questionId, selectedOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    if (isSubmittedRef.current) return; // Prevent double submission
    isSubmittedRef.current = true;
  
    clearInterval(timerRef.current); // Stop timer
  
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in.");
      return;
    }
  
    const responses = Object.entries(selectedAnswers).map(
      ([questionId, selectedOption]) => ({
        questionId: parseInt(questionId),
        selectedOption,
      })
    );
  
    const payload = {
      testId: parseInt(testId),
      userId: parseInt(userId),
      responses,
    };
  
    fetch("http://localhost:8080/api/test/submit-test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to submit test");
        return response.json();
      })
      .then((result) => {
        // After submission, fetch the test details again to get the correct answers
        fetch(`http://localhost:8080/api/test/${testId}`)
          .then((res) => res.json())
          .then((testData) => {
            navigate("/test-result", {
              state: {
                percentage: result.percentage,
                answerKey: testData.questions,
              },
            });
          });
      })
      .catch((error) => {
        console.error("Error submitting test:", error);
        alert("Failed to submit test. Please try again.");
      });
  };  

  return (
    <div className="user-test-container">
      {remainingTime > 0 && (
        <div className="remaining-time">
          ⏰ Remaining Time: {Math.floor(remainingTime / 60)}:
          {(remainingTime % 60).toString().padStart(2, "0")}
        </div>
      )}
      {error && <p className="error">{error}</p>}
      {test && <h2>{test.title}</h2>}
      {test && <p>{test.description}</p>}
      {questions.length > 0 ? (
        <>
          <ul className="user-question-list">
            {questions.map((question, index) => (
              <div className="user-question" key={question.id}>
                <h3>
                  {index + 1}. {question.questionText}
                </h3>
                <div>
                  <label>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={question.optionA}
                      checked={selectedAnswers[question.id] === question.optionA}
                      onChange={() =>
                        handleOptionChange(question.id, question.optionA)
                      }
                    />
                    {question.optionA}
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={question.optionB}
                      checked={selectedAnswers[question.id] === question.optionB}
                      onChange={() =>
                        handleOptionChange(question.id, question.optionB)
                      }
                    />
                    {question.optionB}
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={question.optionC}
                      checked={selectedAnswers[question.id] === question.optionC}
                      onChange={() =>
                        handleOptionChange(question.id, question.optionC)
                      }
                    />
                    {question.optionC}
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={question.optionD}
                      checked={selectedAnswers[question.id] === question.optionD}
                      onChange={() =>
                        handleOptionChange(question.id, question.optionD)
                      }
                    />
                    {question.optionD}
                  </label>
                </div>
              </div>
            ))}
          </ul>

          <button
            className="test-submit-button"
            onClick={handleSubmit}
            disabled={isSubmittedRef.current}
          >
            Submit
          </button>
          <button
           className="back-button"
           onClick={() => navigate("/user-dashboard")}
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

export default StartTest;

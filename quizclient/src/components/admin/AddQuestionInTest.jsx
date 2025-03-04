import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AddQuestionInTest = () => {
  const { testId } = useParams(); // Get test ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    testId: testId,
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: '',
  });

  const isFormValid = Object.values(formData).every((value) => value.trim() !== '');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/test/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Question added successfully!');
        navigate('/admin-dashboard'); // Redirect after successful submission
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('Failed to add question.');
    }
  };

  return (
    <div className="add-question-form">
      <h2>Add Question</h2>
      <form onSubmit={handleSubmit}>
        <label>Question:</label>
        <input type="text" name="questionText" value={formData.questionText} onChange={handleChange} required />

        <label>Option A:</label>
        <input type="text" name="optionA" value={formData.optionA} onChange={handleChange} required />

        <label>Option B:</label>
        <input type="text" name="optionB" value={formData.optionB} onChange={handleChange} required />

        <label>Option C:</label>
        <input type="text" name="optionC" value={formData.optionC} onChange={handleChange} required />

        <label>Option D:</label>
        <input type="text" name="optionD" value={formData.optionD} onChange={handleChange} required />

        <label>Correct Answer:</label>
        <input type="text" name="correctOption" value={formData.correctOption} onChange={handleChange} required />


        <button type="submit" disabled={!isFormValid}>Submit</button>
      </form>
    </div>
  );
};

export default AddQuestionInTest;

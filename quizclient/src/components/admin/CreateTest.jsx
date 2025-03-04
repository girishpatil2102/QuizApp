import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTest = () => {
  const navigate = useNavigate();
  const [testData, setTestData] = useState({
    title: '',
    description: '',
    time: ''
  });

  const handleChange = (e) => {
    setTestData({ ...testData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/test', testData, {
        headers: { 'Content-Type': 'application/json' }
      });
      alert('Test Created Successfully!');
      navigate('/admin-dashboard'); // Redirect to dashboard after creation
    } catch (error) {
      console.error('Error creating test:', error);
      alert('Failed to create test');
    }
  };

  return (
    <div className="create-test-container">
      <h2>Create Quiz</h2>
      <form onSubmit={handleSubmit}>
        <label>Quiz Title:</label>
        <input type="text" name="title" value={testData.title} onChange={handleChange} required />

        <label>Quiz Description:</label>
        <textarea name="description" value={testData.description} onChange={handleChange} required />

        <label>Time per Question (seconds):</label>
        <input type="number" name="time" value={testData.time} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateTest;

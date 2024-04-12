import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box, Button, CircularProgress } from '@mui/material';

function Quiz() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const MAX_QUESTIONS = 10;
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    fetchRandomQuestion();
  }, []);

  const fetchRandomQuestion = async () => {
    if (questionCount >= MAX_QUESTIONS) {
      // Quiz finished, show result to user
      setQuizCompleted(true);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5000/random-question');
      const { question, options } = response.data;
      setQuestion(question);
      setOptions(options);
      setQuestionCount(questionCount + 1);
    } catch (error) {
      console.error('Error fetching random question:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    // Submit the selected option to the backend or perform any action
    console.log('Selected option:', selectedOption);
    // Calculate score
    calculateScore();
    // Fetch next question
    fetchRandomQuestion();
  };

  const calculateScore = () => {
    // Implement your score calculation logic here based on correct answers
    // For simplicity, let's assume the correct answer is the first option
    if (selectedOption === options[0]) {
      setScore(score + 1);
    }
  };

  const saveResults = async (userId) => {
    try {
      // Save quiz results to the database
      const response = await axios.post('http://localhost:5000/save-results', { score, userId});
      console.log('Results saved:', response.data);
    } catch (error) {
      console.error('Error saving results:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {isLoading ? (
        <CircularProgress />
      ) : quizCompleted ? (
        <Typography variant="h4" gutterBottom>
          Your score: {score} / {MAX_QUESTIONS}
          <Button onClick={saveResults}>Save Results</Button>
        </Typography>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            {question}
          </Typography>
          {options.map((option, index) => (
            <Button
              key={index}
              variant={selectedOption === option ? 'contained' : 'outlined'}
              color={selectedOption === option ? 'success' : 'primary'}
              onClick={() => handleOptionClick(option)}
              sx={{ m: 1 }}
            >
              {option}
            </Button>
          ))}
          <Button onClick={handleSubmit} disabled={!selectedOption}>Submit</Button>
        </>
      )}
    </Box>
  );
}

export default Quiz;

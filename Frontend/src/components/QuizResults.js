import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
 
function QuizResults() {
  const [results, setResults] = useState([]);
 
  useEffect(() => {
    fetchQuizResults();
  }, []);
 
  const fetchQuizResults = async () => {
    try {
      const response = await axios.get('http://localhost:5000/quiz-results');
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching quiz results:', error);
    }
  };
 
  return (
<div>
<Typography variant="h4" gutterBottom>
        Quiz Results
</Typography>
      {Array.isArray(results) && results.map(result => (
<div key={result._id}>
<Typography variant="body1" gutterBottom>
            User: {result.userId}, Score: {result.score}
</Typography>
</div>
      ))}
</div>
  );
}
 
export default QuizResults;
import React from 'react';
import Quiz from './Quiz';
import QuizResults from './QuizResults';
 
function HomePage() {
  return (
<div>
<h1>Welcome to the Quiz App!</h1>
<Quiz />
<QuizResults />
</div>
  );
}
 
export default HomePage;
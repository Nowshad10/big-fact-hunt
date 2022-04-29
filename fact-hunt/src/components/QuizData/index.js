import React, { useState, useEffect } from 'react';
import QuizMain from '../QuizMain';
import './style.css';

const APIurl = `https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple`;

const QuizData = () => {

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0); 
    
    useEffect(() => {
        fetch(APIurl)
        .then(response => response.json())
        .then(data => {
          const questions = data.results.map((question) => ({
            ...question,
            answers:[question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5)
          }))
          setQuestions(questions)
        });
      }, [])

      const handleAnswer = (answer) => {
        if (answer === questions[currentIndex].correct_answer) {
          setScore(score+1);
        }
    
        setCurrentIndex(currentIndex+1);
      }


  return ( questions.length > 0 ? (
    <div className='container'>
      {currentIndex >= questions.length ? (
      <h1>Quiz Ended. Your score is {score}</h1>): 
      <QuizMain handleAnswer={handleAnswer} data={questions[currentIndex]}/>}
    </div>
  ) : <div className='container'>Loading...</div>
    
  );
}

export default QuizData;

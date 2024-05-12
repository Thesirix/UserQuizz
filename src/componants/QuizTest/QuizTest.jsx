import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function QuizTest() {
  const [questions, setQuestions] = useState([]);  // To hold questions from the database
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null); // Index of the selected answer
  const [score, setScore] = useState(0); // Score
  const [showScore, setShowScore] = useState(false); // Boolean to show score at the end
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [token, setToken] = useState(""); // Token for auth
  const [timer, setTimer] = useState(0); // Timer state for stopwatch feature

  // Fetch token on component mount
  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: "superuser@gmail.com",
          password: "Merci2024/*"
        });
        setToken(response.data.token);  // Set the auth token
      } catch (error) {
        console.error("Error fetching token:", error);
        setError(error);
      }
    }
    fetchToken();
  }, []);

  // Fetch questions from the database once the token is available
  useEffect(() => {
    async function fetchQuestions() {
      if (!token) return;
      try {
        const response = await axios.get('http://localhost:3000/api/questions/category/1', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setQuestions(response.data);  // Set questions from the database
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError(error);
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [token]);

  // Function to handle the answer button click
  const onAnswerSelected = (answer, index) => {
    if (selectedAnswerIndex === index) return; // If same answer selected again, do nothing
    setSelectedAnswerIndex(index); // Set the currently selected answer index
    if (answer.is_correct) {
      setScore(score + 1); // Increase score if the answer is correct
    }
  };

  // Skip to the next question
  const handleSkip = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedAnswerIndex(null); // Reset the selected answer index
    } else {
      setShowScore(true); // End of questions
    }
  };

  // Go to the next question or finish the quiz
  const onClickNext = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedAnswerIndex(null); // Reset the selected answer index
    } else {
      setShowScore(true); // End of questions
    }
  };

  // Helper to add leading zero for formatting
  const addLeadingZero = (num) => num.toString().padStart(2, '0');

  // Compute the result object for the final score display
  const result = {
    score,
    correctAnswers: score,
    wrongAnswers: questions.length - score,
  };

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>Error loading questions: {error.toString()}</div>;

  return (
    <div className="quiz-container">
      {!showScore ? (
        <div>
          <div className="leftnum">
            <span className="active-question-no">
              {addLeadingZero(currentQuestionIndex + 1)}
            </span>
            <span className="total-question">
              /{addLeadingZero(questions.length)}
            </span>
          </div>
          <h2>{questions[currentQuestionIndex]?.content}</h2>

          <ul>
            {questions[currentQuestionIndex]?.answers.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(answer, index)}
                key={index}
                className={selectedAnswerIndex === index ? "selected-answer" : ""}
              >
                {answer.content}
              </li>
            ))}
          </ul>
          <div className="flex-right">
            <button onClick={handleSkip} className="skip">
              Skip
            </button>
            <button
              onClick={onClickNext}
              className="next"
              disabled={selectedAnswerIndex === null}
            >
              {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Question: <span>{questions.length}</span>
          </p>
          <p>
            Total Score:<span> {result.score}</span>
          </p>
          <p>
            Correct Answers:<span> {result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers:<span> {result.wrongAnswers}</span>
          </p>
        </div>
      )}

      {!showScore && (
        <div className="stopwatch-container">
          <div className="stopwatch-content">
            <div className="stopwatch-icon">
              <i className="fa-solid fa-stopwatch"> :</i>
            </div>
            <span className="timer">{timer} seconds</span>
          </div>
        </div>
      )}
    </div>
  );
};

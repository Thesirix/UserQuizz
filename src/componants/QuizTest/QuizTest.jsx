import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function QuizTest() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: "superuser@gmail.com",
          password: "Merci2024/*"
        });
        setToken(response.data.token);
      } catch (error) {
        console.error("Error fetching token:", error);
        setError(error);
      }
    }
    fetchToken();
  }, []);

  useEffect(() => {
    async function fetchQuestions() {
      if (!token) return;
      try {
        const response = await axios.get('http://localhost:3000/api/questions/category/1', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError(error);
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [token]);

  const handleAnswerButtonClick = (isCorrect, questionId) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowScore(true);
    }

    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: isCorrect
    });
  };

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>Error loading questions: {error.toString()}</div>;

  return (
    <div className="quiz-container">
      {!showScore ? (
        <>
          <div>
            <div className="leftnum">
              <span className="active-question-no">
                {currentQuestionIndex + 1}
              </span>
              <span className="total-question">
                /{questions.length}
              </span>
            </div>
            <h2>{questions[currentQuestionIndex]?.content}</h2>

            <ul>
              {questions[currentQuestionIndex]?.answers.map((answer, index) => (
                <li
                  onClick={() => handleAnswerButtonClick(answer.is_correct, questions[currentQuestionIndex].question_id)}
                  key={index}
                  className={selectedAnswers[questions[currentQuestionIndex].question_id] === answer.is_correct ? "selected-answer" : ""}
                >
                  {answer.content}
                </li>
              ))}
            </ul>
            <div className="flex-right">
              <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)} className="skip">
                Skip
              </button>
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                className="next"
                disabled={selectedAnswers[questions[currentQuestionIndex].question_id] === undefined}
              >
                {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Question: <span>{questions.length}</span>
          </p>
          <p>
            Total Score:<span> {score}</span>
          </p>
          <p>
            Correct Answers:<span> {Object.values(selectedAnswers).filter(Boolean).length}</span>
          </p>
          <p>
            Wrong Answers:<span> {questions.length - Object.values(selectedAnswers).filter(Boolean).length}</span>
          </p>
        </div>
      )}
    </div>
  );
};

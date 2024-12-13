import { useState, useEffect } from "react";
import quiz from "../assets/Data/P";

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [timer, setTimer] = useState(10);
  const [responseTime, setResponseTime] = useState(null); // Variable pour stocker le temps de réponse

  const { questions } = quiz;
  const { question, choices, correctAnswer } = questions[activeQuestion];

  useEffect(() => {
    if (!showResult) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activeQuestion, timer, showResult]);

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) => {
      if (selectedAnswer) {
        // Calculer les points en fonction du temps de réponse
        const points = calculatePoints(responseTime);
        return {
          ...prev,
          score: prev.score + points,
          correctAnswers: prev.correctAnswers + 1,
        };
      } else {
        return {
          ...prev,
          wrongAnswers: prev.wrongAnswers + 1,
        };
      }
    });
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
      setTimer(10);
      setResponseTime(null); // Réinitialiser le temps de réponse
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
    // Enregistrer le temps de réponse lorsque l'utilisateur clique sur une réponse
    setResponseTime(10 - timer);
  };

  const handleSkip = () => {
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
      setTimer(10);
      setResponseTime(null); // Réinitialiser le temps de réponse
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const calculatePoints = (responseTime) => {
    // Calculer les points en fonction du temps de réponse
    const points = 11 - responseTime; // 1 seconde vaut 1 point, donc si le temps de réponse est de 0, l'utilisateur obtiendra 11 points
    return Math.max(1, points); // Assurez-vous que l'utilisateur obtient au moins 1 point même s'il répond après les 10 secondes
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          <div className="leftnum">
            <span className="active-question-no">
              {addLeadingZero(activeQuestion + 1)}
            </span>
            <span className="total-question">
              /{addLeadingZero(questions.length)}
            </span>
          </div>
          <h2>{question}</h2>

          <ul>
            {choices.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(answer, index)}
                key={answer}
                className={
                  selectedAnswerIndex === index ? "selected-answer" : null
                }
              >
                {answer}
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
              {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
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

      {!showResult && (
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

export default Quiz;

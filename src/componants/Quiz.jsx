import React, { useState, useEffect } from 'react';
import quiz from "../assets/Data/Q";

const Quiz = () => {
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
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

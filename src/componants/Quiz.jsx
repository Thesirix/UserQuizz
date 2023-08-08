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


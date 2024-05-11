import React, { useState, useEffect } from "react";
import axios from 'axios'; 

export default function QuizTest() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  // Fonction pour obtenir le token dynamiquement
  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: "superuser@gmail.com",
          password: "Merci2024/*"
        });
        setToken(response.data.token);  // Mise à jour du token
      } catch (error) {
        console.error("Error getting token:", error);
        setError("Failed to get token");
      }
    }

    fetchToken();
  }, []);

  useEffect(() => {
    async function getAllQuestions() {
      if (!token) return;  // Ne pas exécuter si le token n'est pas encore prêt

      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/api/questions/category/1",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        setError("Failed to fetch questions");
      }
      setLoading(false);
    }

    getAllQuestions();
  }, [token]); // Effectue le fetch des questions quand le token change

  return (
    <div>
      <h1>Questions</h1>
      {loading ? (
        <p>Loading questions...</p>
      ) : error ? (
        <p>{error}</p>
      ) : questions.length > 0 ? (
        <ul>
          {questions.map(question => (
            <li key={question.question_id}>
              {question.content}
              <ul>
                {question.answers && question.answers.map(answer => (
                  <li key={answer.answer_id}>{answer.content}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
}

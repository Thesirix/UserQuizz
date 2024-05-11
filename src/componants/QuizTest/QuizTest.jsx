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
      console.log("Attempting to fetch token..."); // Log pour diagnostic
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: "superuser@gmail.com",
          password: "Merci2024/*"
        });
        setToken(response.data.token);  // Mise à jour du token
        console.log("Token fetched successfully:", response.data.token); // Log pour diagnostic
      } catch (error) {
        console.error("Error getting token:", error);
        setError("Failed to get token");
        console.log("Failed to fetch token:", error.message); // Log pour diagnostic
      }
    }

    fetchToken();
  }, []);

  useEffect(() => {
    async function getAllQuestions() {
      if (!token) {
        console.log("Token not available yet."); // Log pour diagnostic
        return;  // Ne pas exécuter si le token n'est pas encore prêt
      }

      setLoading(true);
      console.log("Fetching questions with token:", token); // Log pour diagnostic

      try {
        const response = await axios.get('http://localhost:3000/api/questions/category/1', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setQuestions(response.data);
        console.log("Questions fetched successfully:", response.data); // Log pour diagnostic
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError("Failed to fetch questions");
        console.log("Failed to fetch questions:", error.message); // Log pour diagnostic
      } finally {
        setLoading(false);
      }
    }

    getAllQuestions();
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Questions</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <p>{question.content}</p>
          {question.answers && (
            <ul>
              {question.answers.map((answer, idx) => (
                <li key={idx}>{answer.content} - Correct: {answer.is_correct ? "Yes" : "No"}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

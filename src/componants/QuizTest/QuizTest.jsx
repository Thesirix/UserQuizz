import React, { useState, useEffect } from "react";

export default function QuizTest() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNTI1Njc0OSwiZXhwIjoxNzE1MjYwMzQ5fQ.TS-SZnISn1YgZihohALfqxBrTepgW1wVWHXt3TMqrDg");

  useEffect(() => {
    async function getAllQuestions() {
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
  }, [token]); // Ajout de 'token' dans les dépendances si son changement doit re-déclencher l'effet

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

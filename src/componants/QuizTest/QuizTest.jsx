import React, { useState, useEffect } from "react";

export default function QuizTest() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Définition de la fonction asynchrone pour récupérer les questions
    async function getAllQuestions() {
      try {
        const response = await fetch("http://localhost:3000/api/questions/category/1", {
          method: "GET",
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNTI0NzgzOCwiZXhwIjoxNzE1MjUxNDM4fQ.7HL_Elr1sbmjiMr8LZ7Wouju4C8dndYyfcafe8Lh6Ag"
          }
        });

        // Vérification si la réponse est réussie
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    }

    // Appel de la fonction pour récupérer les données
    getAllQuestions();
  }, []);

  // Affichage des questions
  return (
    <div>
      <h1>Questions</h1>
      {questions.length > 0 ? (
        <ul>
          {questions.map((question, index) => (
            <li key={index}>{question.text}</li> // Assurez-vous que chaque question a un attribut 'text'
          ))}
        </ul>
      ) : (
        <p>Aucune question disponible.</p>
      )}
    </div>
  );
}

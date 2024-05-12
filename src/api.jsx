import axios from 'axios';

// Fonction pour se connecter et obtenir un token
export const loginAndGetToken = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      email: "superuser@gmail.com",
      password: "Merci2024/*"
    });
    return response.data.token;  // Assurez-vous que votre backend envoie le token avec cette clé
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};

// Fonction pour récupérer les questions avec le token
export const fetchQuestions = async () => {
  const token = await loginAndGetToken();
  if (!token) {
    console.error("Failed to get token");
    return;
  }

  try {
    const response = await axios.get('http://localhost:3000/api/questions', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;  // Supposons que les questions sont ici
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

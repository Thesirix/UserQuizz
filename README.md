# Application de Test pour Étudiants

![Aperçu de l'application](./smcq.gif)

## Description

Cette application web permet de gérer des tests de connaissance pour les étudiants. Elle est développée en utilisant **React** pour le front-end et **Node.js** avec **Express** pour le back-end. 

### Fonctionnalités

- **Espace Administrateur** :
  - Création et gestion de questions pour les tests.
  - Génération et gestion des comptes étudiants.
  - Visualisation des résultats des tests.

- **Espace Candidat** :
  - Test de connaissances via un questionnaire à choix multiples (QCM).
  - Chronomètre intégré pour chaque session de test.
  - Affichage des résultats après le test.

- **Tableau de Bord** :
  - Suivi des performances des étudiants.
  - Statistiques sur les tests passés.

## Installation

1. **Cloner le dépôt :**

   ```bash
   git clone https://github.com/votre-utilisateur/votre-repo.git
   cd votre-repo
   ```

2. **Installation des dépendances :**

   - Pour le backend :

     ```bash
     cd backend
     npm install
     ```

   - Pour le frontend :

     ```bash
     cd frontend
     npm install
     ```

3. **Configuration de l'environnement :**

   Créez un fichier `.env` dans le répertoire `backend` avec les variables d'environnement nécessaires :

   ```env
   PORT=5000
   DATABASE_URL=votre_url_de_base_de_données
   JWT_SECRET=votre_secret_jwt
   ```

4. **Lancer l'application :**

   - Backend :

     ```bash
     cd backend
     npm start
     ```

   - Frontend :

     ```bash
     cd frontend
     npm start
     ```

## Utilisation

- **Accès Administrateur** : Se connecter avec un compte administrateur pour créer des questions et gérer les étudiants.
- **Accès Candidat** : Se connecter avec un compte étudiant pour accéder aux tests chronométrés.

## Structure du Projet

```plaintext
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utils
│   └── app.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.js
│   └── public
│
├── .env.example
├── smcq.gif
└── README.md
```

## Technologies Utilisées

- **Frontend** : React, React Router, Axios
- **Backend** : Node.js, Express, MongoDB
- **Autres** : JWT pour l'authentification, Bcrypt pour le hachage des mots de passe

## Contribution

Les contributions sont les bienvenues ! Merci de soumettre une *pull request* pour toute amélioration ou correction.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](./LICENSE) pour plus de détails.

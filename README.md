# To-Do List API (Back)

Une API REST pour gérer une liste de tâches (CRUD) développée avec **Node.js**, **Express**, et **MongoDB**.

---

## Prérequis

Avant d'installer le projet, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- **Node.js
- **MongoDB

---

##  Installation

###  **Installer les dépendances**
```sh
npm install
```

### **Configurer les variables d'environnement**

Créez un fichier `.env` à la racine du projet et ajoutez :
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/todo-db  # Modifier si utilisation de MongoDB Atlas
```

---

##  Installation avec Docker 

### (lancer le back avec Docker)

Dans la racine
```env
docker compose up --build 
```

---

## Démarrer le serveur

### **Démarrage en mode développement**
```sh
npm run start
```
Le serveur sera accessible sur **http://localhost:5000**

---

##  API Endpoints

| Méthode  | Route        | Description |
|----------|-------------|-------------|
| **POST** | `/tasks`     | Ajouter une tâche  |
| **GET**  | `/tasks`     | Obtenir toutes les tâches  |
| **GET**  | `/tasks/:id` | Obtenir une tâche par ID  |
| **PUT**  | `/tasks/:id` | Modifier une tâche  |
| **DELETE** | `/tasks/:id` | Supprimer une tâche  |

---

##  Exécution des tests

### **Tests unitaires (Jest)**
```sh
npm test
```

---

---

# To-Do List Front

## Dependencies
- axios
- vue-router
- bootstrap
---

##  Installation

###  **Installer les dépendances**
```sh
npm install
```
---

## Démarrer le serveur

### **Démarrage en mode développement**
```sh
npm run dev 
```
L'application sera accessible sur **http://localhost:5173/**

---

npm run dev 

# To-Do List Application

Cette application est une **To-Do List** Full Stack construite avec :
- **Backend** → Node.js + Express + TypeScript  
- **Frontend** → Vue.js + TypeScript + Vite  
- **Base de données** → MongoDB  
- **Tests** → Vitest + Jest  
- **Conteneurisation** → Docker + Docker Compose  

---

## **Technologies utilisées**
| Technologie | Description |
|------------|-------------|
| **Node.js** | Environnement d'exécution JavaScript côté serveur |
| **Express** | Framework backend pour Node.js |
| **TypeScript** | Langage typé basé sur JavaScript |
| **Vue.js** | Framework frontend réactif |
| **MongoDB** | Base de données NoSQL |
| **Docker** | Conteneurisation |
| **Vitest** | Framework de test pour le frontend |
| **Jest** | Framework de test pour le backend |
| **Swagger** | Documentation API |

---

## **Structure du projet**
```
to_do_list/
├── todo-back/         # Backend avec Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/    # Configuration de l'application (Swagger, DB, etc.)
│   │   ├── controllers/ 
│   │   ├── domain/    # Définition des entités
│   │   ├── errors/    
│   │   ├── middlewares/ 
│   │   ├── repositories/ 
│   │   ├── routes/    # Routes Express
│   │   ├── services/  # Logique métier
│   │   └── tests/     # Tests backend (avec Jest)
│   ├── Dockerfile
│   ├── jest.config.js
│   ├── package.json
│   └── tes.config.json
├── todo-front/        # Frontend avec Vue.js + TypeScript 
│   ├── src/
│   │   ├── assets/    
│   │   ├── components/ # Composants Vue.js
│   │   ├── entities/  # Entités TypeScript
│   │   ├── router/    # Vue Router
│   │   ├── services/  # Logique frontend
│   │   ├── utils/  # comme sweet alert
│   │   ├── views/  # Pages Vue.js
│   │   ├── App.vue
│   │   └── main.ts     # Pages Vue.js
│   ├── tests/
│   ├── Dockerfile
│   ├── env.d.ts
│   ├── index.html
│   ├── package.json
│   ├── ts.config.json
│   ├── ts.config.app.json
│   └── vite.config.ts
├── docker-compose.yml
└── README.md
```

---

## **Installation**
### **1. Cloner le projet**
```bash
git clone https://github.com/hichamHarra96/to-do-list.git
cd to_do_list
```

### **2. Créer le fichier `.env` pour le backend**
Dans `todo-back/.env` :  
```
MONGO_URI=mongodb://mongo:27017/todo
PORT=5000
```

### **3. Créer le fichier `.env` pour le frontend**
Dans `todo-front/.env` :  
```
VITE_API_URL=http://localhost:5000/tasks
```

### **4. Lancer l'application avec Docker Compose**
```bash
docker-compose up -d
```

L'application sera disponible sur :  
- **Frontend** → [http://localhost:5178](http://localhost:5178)  
- **Backend** → [http://localhost:5000](http://localhost:5000)  

---

## **Commandes utiles**
### **Backend**
| Commande | Description |
|----------|-------------|
| `npm install` | Installer les dépendances |
| `npm run start` | démarrer le backend (dev env)|
| `npm test` | Lancer les tests Jest |.

### **Frontend**
| Commande | Description |
|----------|-------------|
| `npm install` | Installer les dépendances |
| `npm run dev` | Lancer le frontend en mode développement |
| `npm vitest` | Lancer les tests Vitest |

---

## **Tests**
### **Tests Backend (Jest)**
```bash
cd todo-back
npm test
```

### **Tests Frontend (Vitest)**
```bash
cd todo-front
npx vitest --watch
```

---

## **Documentation Swagger**
- Lancer le backend  
- Aller sur : [http://localhost:5000/api-docs](http://localhost:5000/api-docs)  

 La documentation Swagger affichera toutes les routes de l'API.  

---

## **Lancement avec Docker Compose**
###  **Build + Lancement**
```bash
docker-compose up -d --build
```

###  **Arrêter les services**
```bash
docker-compose down
```

---

##  **Fonctionnalités**
CRUD complet :  
- **Créer une tâche**  
- **Lire une tâche**  
- **Mettre à jour une tâche**  
- **Supprimer une tâche**  

Gestion des statuts de tâche :  
- `todo`, `in_progress`, `done`  

Validation côté backend et frontend  

Gestion des erreurs et affichage de notifications avec **SweetAlert**.

---

## **Points à améliorer (ou à faire)**
 **Authentification JWT** → Sécuriser l'API avec un système d'authentification basé sur JWT.   
 **Tests E2E (End-to-End)** → Ajouter des tests E2E avec Cypress ou Playwright.  
 **CI/CD** → Mettre en place une intégration et un déploiement continu avec GitHub Actions.  

---

## **Configuration Docker Compose avec localhost**
- Le fichier `docker-compose.yml` est configuré pour fonctionner avec **localhost** au lieu du nom du service Docker (`back`).  
- Cela est dû au fait que le **frontend tourne dans le navigateur** et non dans le conteneur Docker.  
  - Si tu utilises `http://back:5000/tasks`, le navigateur essaiera de résoudre le nom `back` comme un domaine public → Ce qui va provoquer une **erreur de DNS**.  
  - `localhost` fonctionne car le navigateur peut se connecter directement à `localhost` sur le port **5000**.  

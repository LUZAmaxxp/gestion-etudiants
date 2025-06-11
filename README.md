# Application de Gestion des Étudiants

““  🚀 https://github.com/LUZAmaxxp/gestion-etudiants/

 
Une application CRUD complète pour la gestion des étudiants, développée avec Angular (frontend), Node.js/Express (backend) et MSSQL (base de données).

## 🚀 Fonctionnalités

- **CRUD complet** : Créer, lire, modifier et supprimer des étudiants
- **Recherche avancée** : Rechercher par nom, prénom, email ou téléphone
- **Interface moderne** : Interface utilisateur responsive avec Bootstrap
- **Pagination** : Navigation par pages pour de grandes listes
- **Validation** : Validation des formulaires côté client et serveur
- **Notifications** : Messages de succès et d'erreur
- **Responsive** : Compatible mobile et desktop

## 🛠️ Technologies utilisées

### Frontend
- **Angular 20** - Framework frontend
- **Bootstrap 5** - Framework CSS
- **Bootstrap Icons** - Icônes
- **TypeScript** - Langage de programmation

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MSSQL** -  MSSQL
- **CORS** - Gestion des requêtes cross-origin

### Base de données
- **MSSQL** - Système de gestion de base de données

## 📋 Prérequis

- Node.js (version 18 ou supérieure)
- MSSQL 
- npm ou yarn

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd gestion-etudiants
```

### 2. Configuration de la base de données

1. **Créer la base de données MSSQL** :
   ```sql
   CREATE DATABASE gestion_etudiants;
   ```


3. **Configurer les variables d'environnement** :
   - Copier `backend/config.env` vers `backend/.env`
   - Modifier les paramètres de connexion selon votre configuration MSSQL

### 3. Installation du backend

```bash
cd backend
npm install
```

### 4. Installation du frontend

```bash
cd ../frontend/gestion-etudiants-app
npm install
```

## 🏃‍♂️ Démarrage de l'application

### 1. Démarrer le serveur backend

```bash
cd backend
npm run dev
```

Le serveur sera accessible sur `http://localhost:3000`

### 2. Démarrer l'application frontend

```bash
cd frontend/gestion-etudiants-app
ng serve
```

L'application sera accessible sur `http://localhost:4200`

## 📊 Structure de la base de données

### Table `etudiant`

| Colonne | Type | Contrainte | Description |
|---------|------|------------|-------------|
| id | INT | PRIMARY KEY | Identifiant unique |
| nom | VARCHAR(100) | NOT NULL | Nom de l'étudiant |
| prenom | VARCHAR(100) | NOT NULL | Prénom de l'étudiant |
| email | VARCHAR(255) | NOT NULL, UNIQUE | Adresse email |
| tel | VARCHAR(20) | NOT NULL, UNIQUE | Numéro de téléphone |
| date_naissance | DATE | NOT NULL | Date de naissance |
| filiere | VARCHAR(100) | NOT NULL | Filière d'étude |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Date de création |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Date de modification |

## 🔧 API Endpoints

### Étudiants

- `GET /api/etudiants` - Récupérer tous les étudiants
- `GET /api/etudiants/:id` - Récupérer un étudiant par ID
- `GET /api/etudiants/search?q=query` - Rechercher des étudiants
- `POST /api/etudiants` - Créer un nouvel étudiant
- `PUT /api/etudiants/:id` - Modifier un étudiant
- `DELETE /api/etudiants/:id` - Supprimer un étudiant

## 🎨 Interface utilisateur

### Fonctionnalités principales

1. **Liste des étudiants** : Affichage en tableau avec pagination
2. **Recherche** : Barre de recherche en temps réel
3. **Ajout d'étudiant** : Formulaire avec validation
4. **Modification** : Édition inline des données
5. **Suppression** : Confirmation avant suppression
6. **Notifications** : Messages de succès et d'erreur

### Validation des formulaires

- **Nom/Prénom** : Champs obligatoires
- **Email** : Format email valide, unique
- **Téléphone** : Format téléphone, unique
- **Date de naissance** : Date valide
- **Filière** : Sélection obligatoire

## 🔒 Sécurité

- Validation côté serveur et client
- Protection contre les injections SQL
- Gestion des erreurs CORS
- Validation des types de données

## 📱 Responsive Design

L'application est entièrement responsive et s'adapte aux différentes tailles d'écran :
- Desktop (≥1200px)
- Tablet (≥768px)
- Mobile (<768px)

## 🧪 Tests

Pour exécuter les tests :

```bash
# Tests backend
cd backend
npm test

# Tests frontend
cd frontend/gestion-etudiants-app
ng test
```

## 📦 Scripts disponibles

### Backend
- `npm start` - Démarrer en mode production
- `npm run dev` - Démarrer en mode développement avec nodemon

### Frontend
- `ng serve` - Démarrer le serveur de développement
- `ng build` - Construire pour la production
- `ng test` - Exécuter les tests unitaires

## 🐛 Dépannage

### Problèmes courants

1. **Erreur de connexion à la base de données** :
   - Vérifier que MSSQL est démarré
   - Vérifier les paramètres de connexion dans `.env`

2. **Erreur CORS** :
   - Vérifier que le serveur backend est démarré sur le port 3000
   - Vérifier la configuration CORS dans `server.js`

3. **Erreur de compilation Angular** :
   - Vérifier que toutes les dépendances sont installées
   - Exécuter `npm install` dans le dossier frontend

## 📝 Structure du projet

```
gestion-etudiants/
├── backend/
│   ├── server.js              # Serveur Express
│   ├── database.sql           # Script de création de la base
│   ├── config.env             # Configuration (à copier en .env)
│   ├── package.json
│   └── node_modules/
├── frontend/
│   └── gestion-etudiants-app/
│       ├── src/
│       │   ├── app/
│       │   │   ├── components/
│       │   │   │   └── etudiant-list/
│       │   │   ├── models/
│       │   │   │   └── etudiant.model.ts
│       │   │   ├── services/
│       │   │   │   └── etudiant.service.ts
│       │   │   ├── app.ts
│       │   │   ├── app.html
│       │   │   └── app.config.ts
│       │   ├── styles.css
│       │   └── main.ts
│       ├── angular.json
│       ├── package.json
│       └── node_modules/
└── README.md
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request


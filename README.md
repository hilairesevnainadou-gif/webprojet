# NovaTech Platform – README Complet (Avec Rôles Dynamiques)

## Description

**NovaTech Platform** est une application web modulable pour :

* **Entreprises** : consulter et acheter des services numériques, demander des devis.
* **Particuliers / Clients** : explorer blog, projets, marketplace, et demander des services.
* **Développeurs / Éditeurs** : publier et modérer blog et projets.
* **Admin** : gérer intégralement les services, devis, blog, marketplace et utilisateurs.

L’architecture est **modulaire et non monolithique** :

* **Backend** : Laravel 12+ (API REST, auth dynamique par rôles)
* **Frontend** : React + Vite (séparé pour public et backoffice)

---

## Modules et fonctionnalités

### 1️⃣ Backend Laravel (API)

#### Authentification et Rôles Dynamiques

* Authentification via **Laravel Sanctum** (API token/stateful).
* Rôles dynamiques dans la base de données (`roles` table) :

  * **Admin** → Gestion complète, accès à tous les modules et stats.
  * **Développeur / Éditeur** → Publier et modérer contenu (blog et projets).
  * **Client** → Consulter services, blog, marketplace et demander devis.
* Possibilité d’ajouter de nouveaux rôles facilement sans changer le code.
* Middleware pour vérifier rôle et permissions dynamiques dans toutes les routes API.

#### Modules Backend

| Module               | Description                                        |
| -------------------- | -------------------------------------------------- |
| Service              | CRUD services numériques                           |
| Devis                | Recevoir, traiter et répondre aux demandes         |
| Blog                 | CRUD articles, modération et publication           |
| Projets Développeurs | CRUD projets publiés par éditeurs                  |
| Marketplace          | CRUD produits/solutions                            |
| Users                | Gestion Admin / Dev / Client avec rôles dynamiques |
| Stats                | Dashboard et analytics                             |

---

### 2️⃣ Frontend React + Vite

#### Pages publiques

* Accueil / présentation des services
* Liste des services disponibles
* Formulaire **demande de devis**
* Blog & Projets Développeurs
* Marketplace / Catalogue solutions
* Authentification client pour actions spécifiques

#### Pages Backoffice (Admin / Développeur / Éditeur)

* **Dashboard résumé** : stats des services, ventes, devis
* Gestion Services (CRUD)
* Gestion Devis (voir, traiter, répondre)
* Gestion Blog & Projets (CRUD, modération)
* Gestion Marketplace (CRUD produits/solutions)
* Gestion Utilisateurs (CRUD rôles dynamiques)
* Permissions dynamiques affichées selon le rôle

#### Auth et contrôle d’accès

* Login / Logout sécurisé
* Redirection dynamique vers le dashboard selon rôle
* Accès pages/backoffice contrôlé par rôle
* Frontend communiquant avec Laravel via **Axios + API token**

---

## Cas d’utilisation – Utilisateurs

| Fonctionnalité                       | Acteur      | Résultat attendu                                        |
| ------------------------------------ | ----------- | ------------------------------------------------------- |
| Voir services                        | Client      | Liste complète avec détails et prix                     |
| Demande de devis                     | Client      | Formulaire soumis, notification Admin/Dev               |
| Lire blog                            | Client      | Liste articles et tutoriels                             |
| Voir projets développeurs            | Client      | Liste projets publiés                                   |
| Marketplace                          | Client      | Acheter/réserver solutions                              |
| Login / Dashboard                    | Admin / Dev | Accès sécurisé avec redirection dynamique selon rôle    |
| Publier / Modérer contenu            | Dev         | Articles/projets visibles sur frontend après validation |
| Gérer services / marketplace / devis | Admin       | Tout est mis à jour dynamiquement                       |

---

## Structure du projet

```
site_webnova/
│
├── backend/ (Laravel 12+ API)
│   ├── app/
│   │   ├── Models/ (User, Role, Service, Devis, Blog, Projet, Produit)
│   │   └── Http/Controllers/API/
│   ├── routes/api.php
│   ├── database/migrations/
│   └── tests/
│
├── frontend/ (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/ (Navbar, Footer, Cards, Forms)
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Devis.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── Projets.jsx
│   │   │   ├── Marketplace.jsx
│   │   │   └── Backoffice/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── GestionServices.jsx
│   │   │       ├── GestionDevis.jsx
│   │   │       ├── GestionBlog.jsx
│   │   │       ├── GestionProjets.jsx
│   │   │       └── GestionMarketplace.jsx
│   │   ├── services/ (Axios API calls)
│   │   └── store/ (state management)
│   └── tests/
│
└── README.md
```

---

## Technologies utilisées

* **Backend** : Laravel 12+, Sanctum, MySQL/PostgreSQL
* **Frontend** : React + Vite, Tailwind CSS ou Bootstrap
* **Routing** : react-router-dom
* **API Requests** : Axios
* **Auth & Roles Dynamiques** : Laravel Middleware + Sanctum + Table `roles`
* **Tests** : Pest
* **Documentation** : Markdown (Typora, VSCode, Obsidian)

---

## Installation (Local)

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

* API test : `http://127.0.0.1:8000/api/test`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

* Frontend : `http://localhost:5173`

---

## Contribution

* Projet open-source et modulable
* Contribution bienvenue pour améliorer modules, auth, rôles dynamiques, backoffice et frontend



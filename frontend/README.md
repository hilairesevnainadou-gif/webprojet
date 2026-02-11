# NovaTech Frontend – README

## Description

Le **frontend NovaTech** est une application React + Vite pour :

* Afficher les services numériques et solutions informatiques.
* Permettre aux clients de demander un devis.
* Afficher un blog et les projets des développeurs.
* Fournir une marketplace pour les solutions informatiques.
* Offrir un **backoffice** pour les **Admins et Développeurs / Éditeurs**, avec accès selon rôle.

Le frontend est conçu pour **être séparé du backend**, en utilisant **Axios** pour communiquer avec l’API Laravel 12+.

---

## Structure du projet

```
frontend/
├── public/
├── src/
│   ├── components/       # Composants réutilisables (Navbar, Footer, Cards, Forms)
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Services.jsx
│   │   ├── Devis.jsx
│   │   ├── Blog.jsx
│   │   ├── Projets.jsx
│   │   ├── Marketplace.jsx
│   │   └── Backoffice/
│   │       ├── Dashboard.jsx
│   │       ├── GestionServices.jsx
│   │       ├── GestionDevis.jsx
│   │       ├── GestionBlog.jsx
│   │       ├── GestionProjets.jsx
│   │       └── GestionMarketplace.jsx
│   ├── services/         # Axios API calls
│   │   └── api.js
│   ├── store/            # State management (ex: Redux ou Zustand)
│   └── App.jsx
├── package.json
└── vite.config.js
```

---

## Pages et fonctionnalités

### Pages publiques

| Page        | Fonctionnalité                                 |
| ----------- | ---------------------------------------------- |
| Home        | Présentation des services et nouveautés        |
| Services    | Liste complète des services disponibles        |
| Devis       | Formulaire pour demander un devis personnalisé |
| Blog        | Articles, tutoriels et publications            |
| Projets     | Projets des développeurs                       |
| Marketplace | Catalogue des solutions à acheter ou réserver  |

### Pages Backoffice (Admin / Développeur / Éditeur)

| Page               | Fonctionnalité                                 |
| ------------------ | ---------------------------------------------- |
| Dashboard          | Vue d’ensemble des statistiques, devis, ventes |
| GestionServices    | CRUD services numériques                       |
| GestionDevis       | Voir, traiter et répondre aux demandes         |
| GestionBlog        | CRUD articles et modération                    |
| GestionProjets     | CRUD projets développeurs                      |
| GestionMarketplace | CRUD produits et solutions                     |

### Authentification et rôles

* Login / Logout sécurisé
* Redirection dynamique vers **dashboard** selon rôle
* Accès aux pages **Backoffice** contrôlé par rôle (Admin / Dev / Editeur)
* Récupération des permissions dynamiques via l’API

---

## Connexion Backend

* Utilisation de **Axios** pour appeler l’API Laravel 12+
* Fichier de configuration central : `src/services/api.js`

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true, // nécessaire si utilisation Sanctum
});

export default api;
```

* Exemple d’appel API dans un composant :

```javascript
import { useEffect, useState } from "react";
import api from "../services/api";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get("/services")
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Nos Services</h1>
      {services.map(service => (
        <div key={service.id}>
          <h2>{service.name}</h2>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Services;
```

---

## Installation et démarrage

### Prérequis

* Node.js >= 18
* npm >= 9
* Backend Laravel fonctionnel et accessible (`http://127.0.0.1:8000/api`)

### Installation

```bash
cd frontend
npm install
```

### Lancer le projet

```bash
npm run dev
```

* Frontend disponible : `http://localhost:5173`

---

## Technologies utilisées

* **React** (pages, composants, hooks)
* **Vite** (bundler ultra-rapide)
* **Axios** (communication API)
* **React Router Dom** (routing)
* **Tailwind CSS / Bootstrap** (UI styling)
* **State management** (Redux, Zustand ou context API)

---

## Contribution

* Suivre la structure modulaire pour ajouter des composants et pages
* Respecter la connexion API existante (`src/services/api.js`)
* Créer de nouvelles permissions côté backend si un nouveau rôle est ajouté
* Tests unitaires avec **React Testing Library** (facultatif)

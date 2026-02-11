# NovaTech Backend – README

## Description

Le **backend NovaTech** est une **API Laravel 12+** pour gérer :

* **Services numériques** (CRUD, tarifs, catégories)
* **Demandes de devis** (CRUD, traitement et notifications)
* **Blog et projets développeurs** (CRUD, publication, modération)
* **Marketplace** (CRUD produits et solutions)
* **Utilisateurs et rôles dynamiques** (Admin, Développeur / Éditeur, Client)
* **Statistiques et dashboard** pour backoffice

Il fournit un **backend API REST** pour le frontend React + Vite, avec une **authentification sécurisée** via Laravel Sanctum et des **permissions dynamiques** basées sur les rôles.

---

## Architecture

```
backend/
├── app/
│   ├── Models/
│   │   ├── User.php
│   │   ├── Role.php
│   │   ├── Service.php
│   │   ├── Devis.php
│   │   ├── Blog.php
│   │   ├── Projet.php
│   │   └── Produit.php
│   ├── Http/
│   │   └── Controllers/API/
│   └── Policies/ (facultatif pour permissions dynamiques)
├── database/
│   ├── migrations/
│   └── seeders/ (roles, admin initial)
├── routes/
│   └── api.php
├── config/
│   └── cors.php
└── tests/
```

---

## Modules et fonctionnalités

### 1️⃣ Authentification et rôles dynamiques

* **Laravel Sanctum** pour auth API (token ou stateful)
* Rôles dynamiques stockés dans la table `roles` :

  * **Admin** → gestion complète backoffice et utilisateurs
  * **Développeur / Éditeur** → publier et modérer blog et projets
  * **Client** → consulter services, blog, projets, demander devis
* Middleware vérifiant rôle et permissions sur chaque route
* Possibilité d’ajouter des rôles sans modifier le code

---

### 2️⃣ Modules backend

| Module               | Description                                        |
| -------------------- | -------------------------------------------------- |
| Service              | CRUD services numériques                           |
| Devis                | Recevoir, traiter et répondre aux demandes         |
| Blog                 | CRUD articles, modération et publication           |
| Projets Développeurs | CRUD projets publiés par éditeurs                  |
| Marketplace          | CRUD produits et solutions                         |
| Users                | Gestion Admin / Dev / Client avec rôles dynamiques |
| Stats                | Dashboard et analytics                             |
| Auth                 | Login / Logout / Permissions dynamiques            |

---

### 3️⃣ Routes API (exemples)

```php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ServiceController;
use App\Http\Controllers\API\DevisController;
use App\Http\Controllers\API\BlogController;
use App\Http\Controllers\API\ProjetController;
use App\Http\Controllers\API\MarketplaceController;
use App\Http\Controllers\API\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::middleware(['auth:sanctum'])->group(function() {
    Route::get('/services', [ServiceController::class, 'index']);
    Route::post('/services', [ServiceController::class, 'store'])->middleware('role:admin');
    Route::get('/devis', [DevisController::class, 'index'])->middleware('role:admin');
    Route::post('/devis', [DevisController::class, 'store']);
    Route::get('/blog', [BlogController::class, 'index']);
    Route::post('/blog', [BlogController::class, 'store'])->middleware('role:dev,admin');
    Route::get('/projets', [ProjetController::class, 'index']);
    Route::post('/projets', [ProjetController::class, 'store'])->middleware('role:dev,admin');
    Route::get('/marketplace', [MarketplaceController::class, 'index']);
    Route::post('/marketplace', [MarketplaceController::class, 'store'])->middleware('role:admin');
});
```

---

## CORS

Dans `config/cors.php` :

```php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'],
    'allowed_headers' => ['*'],
    'supports_credentials' => true,
];
```

* Permet la communication avec le frontend React (localhost:5173)

---

## Installation locale

### Prérequis

* PHP >= 8.2
* Composer
* MySQL / PostgreSQL
* Node.js + frontend prêt

### Installation

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed # pour créer rôles et admin initial
php artisan serve
```

* API disponible : `http://127.0.0.1:8000/api/test`

---

## Tests

* Utilisation de **Pest** (recommandé) ou PHPUnit
* Exemple de test API :

```php
it('returns list of services', function() {
    $response = $this->getJson('/api/services');
    $response->assertStatus(200);
});
```

---

## Contribution

* Respecter structure modulaire
* Ajouter de nouveaux modules en suivant conventions CRUD
* Ajouter rôles dynamiques via table `roles`
* Écrire tests pour nouvelles fonctionnalités

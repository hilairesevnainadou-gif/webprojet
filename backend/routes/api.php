<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ServiceController;
use App\Http\Controllers\API\DevisController;
use App\Http\Controllers\API\BlogController;
use App\Http\Controllers\API\ProjetController;
use App\Http\Controllers\API\MarketplaceController;
use App\Http\Controllers\API\SettingController;
use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\API\PermissionController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\TaskController;
use App\Http\Controllers\API\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::get('/settings', [SettingController::class, 'index']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/activate', [AuthController::class, 'activate']);

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{service}', [ServiceController::class, 'show']);

Route::post('/devis', [DevisController::class, 'store']);

Route::get('/blog', [BlogController::class, 'index']);
Route::get('/blog/{blog}', [BlogController::class, 'show']);

Route::get('/projets', [ProjetController::class, 'index']);
Route::get('/projets/{projet}', [ProjetController::class, 'show']);

Route::get('/marketplace', [MarketplaceController::class, 'index']);
Route::get('/marketplace/{marketplace}', [MarketplaceController::class, 'show']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/profile', [ProfileController::class, 'update']);

    // Admin Only
    Route::middleware('role:admin')->group(function () {
        Route::post('/settings', [SettingController::class, 'update']);
        Route::post('/services/{service}/validate', [ServiceController::class, 'validateContent']);
        Route::post('/blog/{blog}/validate', [BlogController::class, 'validateContent']);
        Route::post('/projets/{projet}/validate', [ProjetController::class, 'validateContent']);
        Route::post('/marketplace/{marketplace}/validate', [MarketplaceController::class, 'validateContent']);
        Route::post('/users/{user}/reset-password', [UserController::class, 'requestPasswordReset']);
        Route::apiResource('users', UserController::class);
        Route::apiResource('roles', RoleController::class);
        Route::apiResource('permissions', PermissionController::class);
        Route::apiResource('services', ServiceController::class)->except(['index', 'show']);
        Route::apiResource('devis', DevisController::class)->except(['store']);
        Route::apiResource('marketplace', MarketplaceController::class)->except(['index', 'show']);
    });

    // Admin and Dev
    Route::middleware('role:admin,dev')->group(function () {
        Route::apiResource('blog', BlogController::class)->except(['index', 'show']);
        Route::apiResource('projets', ProjetController::class)->except(['index', 'show']);
        Route::apiResource('tasks', TaskController::class);
    });
});

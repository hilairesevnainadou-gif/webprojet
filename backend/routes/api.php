<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BlogPostController;
use App\Http\Controllers\API\DeveloperProjectController;
use App\Http\Controllers\API\MarketplaceItemController;
use App\Http\Controllers\API\QuoteController;
use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\API\ServiceController;
use App\Http\Controllers\API\StatsController;
use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Route;

Route::options('/{any}', fn () => response()->noContent())->where('any', '.*');

Route::get('/test', fn () => ['message' => 'NovaTech API']);

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);

Route::apiResource('services', ServiceController::class)->only(['index', 'show']);
Route::post('quotes', [QuoteController::class, 'store']);
Route::apiResource('blogs', BlogPostController::class)->only(['index', 'show']);
Route::apiResource('projects', DeveloperProjectController::class)->only(['index', 'show']);
Route::apiResource('marketplace', MarketplaceItemController::class)->only(['index', 'show']);

Route::middleware('api.auth')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::get('/roles', [RoleController::class, 'index']);
    Route::get('/stats', [StatsController::class, 'index'])->middleware('role:admin,editor,developer');

    Route::apiResource('quotes', QuoteController::class)->except(['store']);

    Route::middleware('permission:manage_services')->group(function () {
        Route::apiResource('services', ServiceController::class)->except(['index', 'show']);
    });

    Route::middleware('permission:manage_blog')->group(function () {
        Route::apiResource('blogs', BlogPostController::class)->except(['index', 'show']);
        Route::apiResource('projects', DeveloperProjectController::class)->except(['index', 'show']);
    });

    Route::middleware('permission:manage_marketplace')->group(function () {
        Route::apiResource('marketplace', MarketplaceItemController::class)->except(['index', 'show']);
    });

    Route::middleware('role:admin')->group(function () {
        Route::apiResource('users', UserController::class)->except(['show']);
    });
});

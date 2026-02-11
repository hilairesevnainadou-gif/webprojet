<?php

use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\QuoteController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['locale'])->group(function () {
    Route::get('/health', fn () => response()->json(['ok' => true, 'locale' => app()->getLocale()]));

    Route::middleware(['acting.user'])->group(function () {
        Route::get('/profile', [UserController::class, 'profile']);
        Route::get('/users', [UserController::class, 'index'])->middleware('permission:users.manage');
        Route::post('/users/{user}/roles', [UserController::class, 'syncRoles'])->middleware('permission:roles.manage');
        Route::post('/users/{user}/password-reset', [UserController::class, 'adminResetPassword']);
        Route::post('/users/{user}/password-change', [UserController::class, 'changeOwnPassword']);

        Route::get('/roles-permissions', [UserController::class, 'rolesAndPermissions'])->middleware('permission:roles.manage');

        Route::get('/projects', [ProjectController::class, 'index'])->middleware('permission:projects.manage');
        Route::post('/projects', [ProjectController::class, 'store'])->middleware('permission:projects.manage');
        Route::patch('/projects/{project}', [ProjectController::class, 'update'])->middleware('permission:projects.manage');

        Route::get('/quotes', [QuoteController::class, 'index'])->middleware('permission:quotes.manage');
        Route::post('/quotes', [QuoteController::class, 'store'])->middleware('permission:quotes.manage');
        Route::patch('/quotes/{quote}', [QuoteController::class, 'update'])->middleware('permission:quotes.manage');
    });
});

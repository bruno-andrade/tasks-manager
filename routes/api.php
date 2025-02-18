<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTAuthController;
use App\Http\Middleware\JwtMiddleware;

Route::prefix('v1')->group(function () {

    Route::post('register', [JWTAuthController::class, 'register']);
    Route::post('login', [JWTAuthController::class, 'login']);

    Route::middleware([JwtMiddleware::class])->group(function () {
        Route::post('logout', [JWTAuthController::class, 'logout']);
        Route::get('user', [JWTAuthController::class, 'getUser']);
        
        Route::apiResource('categories', CategoryController::class)->only(['index', 'store']);
        Route::apiResource('tasks', TaskController::class);
    });
});
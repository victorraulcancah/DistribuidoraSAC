<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Clientes\ClienteController;
use App\Http\Controllers\Api\Proveedores\ProveedorController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
    Route::post('refresh', [AuthController::class, 'refresh'])->middleware('auth:api');
    Route::get('me', [AuthController::class, 'me'])->middleware('auth:api');
    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('reset-password', [AuthController::class, 'resetPassword']);
});

Route::middleware('auth:api')->prefix('user')->group(function () {
    Route::get('/', [AuthController::class, 'me']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::put('/password', [AuthController::class, 'updatePassword']);
});

Route::middleware('auth:api')->group(function () {
    Route::apiResource('clientes', ClienteController::class);
    Route::apiResource('proveedores', ProveedorController::class);
});

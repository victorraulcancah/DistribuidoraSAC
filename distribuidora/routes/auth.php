<?php

use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', fn () => response()->json(['message' => 'Use API /api/auth/register'], 404))
        ->name('register');

    Route::post('register', fn () => response()->json(['message' => 'Use API /api/auth/register'], 404));

    Route::get('login', fn () => response()->json(['message' => 'Use API /api/auth/login'], 404))
        ->name('login');

    Route::post('login', fn () => response()->json(['message' => 'Use API /api/auth/login'], 404));

    Route::get('forgot-password', fn () => response()->json(['message' => 'Use API /api/auth/forgot-password'], 404))
        ->name('password.request');

    Route::post('forgot-password', fn () => response()->json(['message' => 'Use API /api/auth/forgot-password'], 404))
        ->name('password.email');

    Route::get('reset-password/{token}', fn () => response()->json(['message' => 'Use API /api/auth/reset-password'], 404))
        ->name('password.reset');

    Route::post('reset-password', fn () => response()->json(['message' => 'Use API /api/auth/reset-password'], 404))
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', fn () => response()->json(['message' => 'Not implemented'], 404))
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', fn () => response()->json(['message' => 'Not implemented'], 404))
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', fn () => response()->json(['message' => 'Not implemented'], 404))
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', fn () => response()->json(['message' => 'Not implemented'], 404))
        ->name('password.confirm');

    Route::post('confirm-password', fn () => response()->json(['message' => 'Not implemented'], 404));

    Route::put('password', fn () => response()->json(['message' => 'Use API /api/user/password'], 404))->name('password.update');

    Route::post('logout', fn () => response()->json(['message' => 'Use API /api/auth/logout'], 404))
        ->name('logout');
});

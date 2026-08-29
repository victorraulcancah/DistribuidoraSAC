<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/login', function () {
    return view('auth.login');
})->name('login');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

/*
 * La suite es una SPA: cualquier ruta que no sea de la API devuelve la misma
 * vista y React decide qué mostrar según el pathname. Va al final para que no
 * tape ninguna de las rutas declaradas arriba.
 */
Route::get('/{path?}', function () {
    return view('auth.login');
})->where('path', '^(?!api|build|storage).*$')->name('app');

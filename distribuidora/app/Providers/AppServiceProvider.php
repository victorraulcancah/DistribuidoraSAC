<?php

namespace App\Providers;

use App\Repositories\Implementations\ClienteRepository;
use App\Repositories\Implementations\ProveedorRepository;
use App\Repositories\Implementations\UserRepository;
use App\Repositories\Interfaces\ClienteRepositoryInterface;
use App\Repositories\Interfaces\ProveedorRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Services\Implementations\ClienteService;
use App\Services\Implementations\ProveedorService;
use App\Services\Implementations\UserService;
use App\Services\Interfaces\ClienteServiceInterface;
use App\Services\Interfaces\ProveedorServiceInterface;
use App\Services\Interfaces\UserServiceInterface;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(UserServiceInterface::class, UserService::class);

        $this->app->bind(ClienteRepositoryInterface::class, ClienteRepository::class);
        $this->app->bind(ClienteServiceInterface::class, ClienteService::class);

        $this->app->bind(ProveedorRepositoryInterface::class, ProveedorRepository::class);
        $this->app->bind(ProveedorServiceInterface::class, ProveedorService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}

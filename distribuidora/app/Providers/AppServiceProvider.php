<?php

namespace App\Providers;

use App\Repositories\Implementations\ClienteRepository;
use App\Repositories\Implementations\CondicionComercialRepository;
use App\Repositories\Implementations\ContactoRepository;
use App\Repositories\Implementations\DireccionRepository;
use App\Repositories\Implementations\HistorialComercialRepository;
use App\Repositories\Implementations\LimiteCreditoRepository;
use App\Repositories\Implementations\ProveedorRepository;
use App\Repositories\Implementations\UserRepository;
use App\Repositories\Interfaces\ClienteRepositoryInterface;
use App\Repositories\Interfaces\CondicionComercialRepositoryInterface;
use App\Repositories\Interfaces\ContactoRepositoryInterface;
use App\Repositories\Interfaces\DireccionRepositoryInterface;
use App\Repositories\Interfaces\HistorialComercialRepositoryInterface;
use App\Repositories\Interfaces\LimiteCreditoRepositoryInterface;
use App\Repositories\Interfaces\ProveedorRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Services\Implementations\ClienteService;
use App\Services\Implementations\CondicionComercialService;
use App\Services\Implementations\ContactoService;
use App\Services\Implementations\DireccionService;
use App\Services\Implementations\HistorialComercialService;
use App\Services\Implementations\LimiteCreditoService;
use App\Services\Implementations\ProveedorService;
use App\Services\Implementations\UserService;
use App\Services\Interfaces\ClienteServiceInterface;
use App\Services\Interfaces\CondicionComercialServiceInterface;
use App\Services\Interfaces\ContactoServiceInterface;
use App\Services\Interfaces\DireccionServiceInterface;
use App\Services\Interfaces\HistorialComercialServiceInterface;
use App\Services\Interfaces\LimiteCreditoServiceInterface;
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

        $this->app->bind(ContactoRepositoryInterface::class, ContactoRepository::class);
        $this->app->bind(ContactoServiceInterface::class, ContactoService::class);

        $this->app->bind(DireccionRepositoryInterface::class, DireccionRepository::class);
        $this->app->bind(DireccionServiceInterface::class, DireccionService::class);

        $this->app->bind(CondicionComercialRepositoryInterface::class, CondicionComercialRepository::class);
        $this->app->bind(CondicionComercialServiceInterface::class, CondicionComercialService::class);

        $this->app->bind(LimiteCreditoRepositoryInterface::class, LimiteCreditoRepository::class);
        $this->app->bind(LimiteCreditoServiceInterface::class, LimiteCreditoService::class);

        $this->app->bind(HistorialComercialRepositoryInterface::class, HistorialComercialRepository::class);
        $this->app->bind(HistorialComercialServiceInterface::class, HistorialComercialService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}

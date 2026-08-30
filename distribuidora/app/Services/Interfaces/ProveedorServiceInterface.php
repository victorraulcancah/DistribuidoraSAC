<?php

namespace App\Services\Interfaces;

interface ProveedorServiceInterface extends ServiceInterface
{
    public function paginate(int $perPage = 15, array $filters = []);
}

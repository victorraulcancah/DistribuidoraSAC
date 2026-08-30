<?php

namespace App\Services\Interfaces;

interface HistorialComercialServiceInterface extends ServiceInterface
{
    public function paginate(int $perPage = 15, array $filters = []);
}

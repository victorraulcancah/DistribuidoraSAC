<?php

namespace App\Services\Interfaces;

interface CondicionComercialServiceInterface extends ServiceInterface
{
    public function paginate(int $perPage = 15, array $filters = []);
}

<?php

namespace App\Services\Interfaces;

interface DireccionServiceInterface extends ServiceInterface
{
    public function paginate(int $perPage = 15, array $filters = []);
}

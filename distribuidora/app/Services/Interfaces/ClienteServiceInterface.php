<?php

namespace App\Services\Interfaces;

interface ClienteServiceInterface extends ServiceInterface
{
    public function paginate(int $perPage = 15, array $filters = []);
}

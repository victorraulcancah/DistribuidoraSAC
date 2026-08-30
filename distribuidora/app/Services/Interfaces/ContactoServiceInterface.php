<?php

namespace App\Services\Interfaces;

interface ContactoServiceInterface extends ServiceInterface
{
    public function paginate(int $perPage = 15, array $filters = []);
}

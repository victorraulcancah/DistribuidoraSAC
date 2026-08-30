<?php

namespace App\Services\Interfaces;

interface LimiteCreditoServiceInterface extends ServiceInterface
{
    public function paginate(int $perPage = 15, array $filters = []);
}

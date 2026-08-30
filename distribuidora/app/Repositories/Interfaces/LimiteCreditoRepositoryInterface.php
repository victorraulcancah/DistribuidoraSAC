<?php

namespace App\Repositories\Interfaces;

interface LimiteCreditoRepositoryInterface extends RepositoryInterface
{
    public function paginate(int $perPage = 15, array $filters = []);
}

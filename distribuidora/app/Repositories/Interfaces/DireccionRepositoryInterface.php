<?php

namespace App\Repositories\Interfaces;

interface DireccionRepositoryInterface extends RepositoryInterface
{
    public function paginate(int $perPage = 15, array $filters = []);
}

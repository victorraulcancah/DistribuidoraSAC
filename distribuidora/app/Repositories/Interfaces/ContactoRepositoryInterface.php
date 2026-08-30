<?php

namespace App\Repositories\Interfaces;

interface ContactoRepositoryInterface extends RepositoryInterface
{
    public function paginate(int $perPage = 15, array $filters = []);
}

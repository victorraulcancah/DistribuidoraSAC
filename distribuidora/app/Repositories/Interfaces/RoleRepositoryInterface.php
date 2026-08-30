<?php

namespace App\Repositories\Interfaces;

interface RoleRepositoryInterface extends RepositoryInterface
{
    public function paginate(int $perPage = 15, array $filters = []);
}

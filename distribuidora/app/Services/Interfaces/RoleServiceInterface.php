<?php

namespace App\Services\Interfaces;

interface RoleServiceInterface extends ServiceInterface
{
    public function paginate(int $perPage = 15, array $filters = []);
}

<?php

namespace App\Repositories\Implementations;

use App\Models\Role;
use App\Repositories\Interfaces\RoleRepositoryInterface;

class RoleRepository extends BaseRepository implements RoleRepositoryInterface
{
    public function __construct(Role $model)
    {
        parent::__construct($model);
    }

    public function paginate(int $perPage = 15, array $filters = [])
    {
        $query = $this->model
            ->withCount('users')
            ->orderBy('name');

        $query = $this->applyFilters($query, $filters);

        return $query->paginate($perPage);
    }

    private function applyFilters($query, array $filters)
    {
        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('display_name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if (! empty($filters['estado'])) {
            $query->where('estado', $filters['estado']);
        }

        return $query;
    }
}

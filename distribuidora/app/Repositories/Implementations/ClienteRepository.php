<?php

namespace App\Repositories\Implementations;

use App\Models\Cliente;
use App\Repositories\Interfaces\ClienteRepositoryInterface;

class ClienteRepository extends BaseRepository implements ClienteRepositoryInterface
{
    public function __construct(Cliente $model)
    {
        parent::__construct($model);
    }

    public function findByDocumento(string $numeroDocumento)
    {
        return $this->model->where('numero_documento', $numeroDocumento)->first();
    }

    public function findByRazonSocial(string $razonSocial)
    {
        return $this->model->where('razon_social', $razonSocial)->first();
    }

    public function paginate(int $perPage = 15, array $filters = [])
    {
        $query = $this->model->with('vendedor')->orderBy('codigo');

        $query = $this->applyFilters($query, $filters);

        return $query->paginate($perPage);
    }

    private function applyFilters($query, array $filters)
    {
        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('codigo', 'like', "%{$search}%")
                    ->orWhere('razon_social', 'like', "%{$search}%")
                    ->orWhere('numero_documento', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if (! empty($filters['estado'])) {
            $query->where('estado', $filters['estado']);
        }

        return $query;
    }
}

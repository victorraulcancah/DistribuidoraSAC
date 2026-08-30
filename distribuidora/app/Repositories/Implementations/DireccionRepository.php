<?php

namespace App\Repositories\Implementations;

use App\Models\Direccion;
use App\Repositories\Interfaces\DireccionRepositoryInterface;

class DireccionRepository extends BaseRepository implements DireccionRepositoryInterface
{
    public function __construct(Direccion $model)
    {
        parent::__construct($model);
    }

    public function paginate(int $perPage = 15, array $filters = [])
    {
        $query = $this->model->with(['cliente:id,razon_social', 'proveedor:id,razon_social'])->orderBy('direccion');

        $query = $this->applyFilters($query, $filters);

        return $query->paginate($perPage);
    }

    private function applyFilters($query, array $filters)
    {
        $this->filterByTercero($query, $filters);

        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('direccion', 'like', "%{$search}%")
                    ->orWhere('distrito', 'like', "%{$search}%")
                    ->orWhere('tipo', 'like', "%{$search}%");
            });
        }

        if (! empty($filters['estado'])) {
            $query->where('estado', $filters['estado']);
        }

        return $query;
    }

    private function filterByTercero($query, array $filters): void
    {
        if (! empty($filters['cliente_id'])) {
            $query->where('cliente_id', $filters['cliente_id']);
        } elseif (! empty($filters['proveedor_id'])) {
            $query->where('proveedor_id', $filters['proveedor_id']);
        }
    }
}

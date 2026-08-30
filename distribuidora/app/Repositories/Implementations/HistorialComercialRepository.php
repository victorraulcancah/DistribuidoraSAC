<?php

namespace App\Repositories\Implementations;

use App\Models\HistorialComercial;
use App\Repositories\Interfaces\HistorialComercialRepositoryInterface;

class HistorialComercialRepository extends BaseRepository implements HistorialComercialRepositoryInterface
{
    public function __construct(HistorialComercial $model)
    {
        parent::__construct($model);
    }

    public function paginate(int $perPage = 15, array $filters = [])
    {
        $query = $this->model->with(['cliente:id,razon_social', 'proveedor:id,razon_social'])->orderBy('id', 'desc');

        $query = $this->applyFilters($query, $filters);

        return $query->paginate($perPage);
    }

    private function applyFilters($query, array $filters)
    {
        $this->filterByTercero($query, $filters);

        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('documento', 'like', "%{$search}%")
                    ->orWhere('tipo_movimiento', 'like', "%{$search}%");
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

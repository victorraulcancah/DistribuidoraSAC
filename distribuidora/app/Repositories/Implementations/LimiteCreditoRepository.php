<?php

namespace App\Repositories\Implementations;

use App\Models\LimiteCredito;
use App\Repositories\Interfaces\LimiteCreditoRepositoryInterface;

class LimiteCreditoRepository extends BaseRepository implements LimiteCreditoRepositoryInterface
{
    public function __construct(LimiteCredito $model)
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

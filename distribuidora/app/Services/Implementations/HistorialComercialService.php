<?php

namespace App\Services\Implementations;

use App\Exceptions\NotFoundException;
use App\Exceptions\ValidationException;
use App\Repositories\Interfaces\HistorialComercialRepositoryInterface;
use App\Services\Interfaces\HistorialComercialServiceInterface;
use App\Traits\HandlesExceptions;

class HistorialComercialService extends BaseService implements HistorialComercialServiceInterface
{
    use HandlesExceptions;

    public function __construct(HistorialComercialRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    public function create(array $data)
    {
        return $this->executeOrFail(function () use ($data) {
            $this->validateTercero($data);

            return $this->repository->create($data);
        }, 'Error al crear registro de historial');
    }

    public function update($id, array $data)
    {
        return $this->executeOrFail(function () use ($id, $data) {
            $this->find($id);
            $this->validateTercero($data);

            return $this->repository->update($id, $data);
        }, 'Error al actualizar registro de historial');
    }

    public function find($id)
    {
        return $this->execute(function () use ($id) {
            $registro = $this->repository->findBy('id', $id);

            if (! $registro) {
                throw new NotFoundException('Registro de historial no encontrado');
            }

            return $registro;
        }, 'Error al buscar registro de historial');
    }

    public function delete($id)
    {
        return $this->executeOrFail(function () use ($id) {
            $this->find($id);

            return $this->repository->delete($id);
        }, 'Error al eliminar registro de historial');
    }

    public function paginate(int $perPage = 15, array $filters = [])
    {
        return $this->repository->paginate($perPage, $filters);
    }

    private function validateTercero(array $data): void
    {
        $hasCliente = ! empty($data['cliente_id']);
        $hasProveedor = ! empty($data['proveedor_id']);

        if (! $hasCliente && ! $hasProveedor) {
            throw new ValidationException('Se debe indicar un cliente o proveedor', [
                'cliente_id' => 'Indica un cliente si el registro no es de un proveedor',
            ]);
        }
    }
}

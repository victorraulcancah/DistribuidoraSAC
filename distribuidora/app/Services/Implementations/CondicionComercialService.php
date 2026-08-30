<?php

namespace App\Services\Implementations;

use App\Exceptions\NotFoundException;
use App\Exceptions\ValidationException;
use App\Repositories\Interfaces\CondicionComercialRepositoryInterface;
use App\Services\Interfaces\CondicionComercialServiceInterface;
use App\Traits\HandlesExceptions;

class CondicionComercialService extends BaseService implements CondicionComercialServiceInterface
{
    use HandlesExceptions;

    public function __construct(CondicionComercialRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    public function create(array $data)
    {
        return $this->executeOrFail(function () use ($data) {
            $this->validateTercero($data);

            return $this->repository->create($data);
        }, 'Error al crear condición comercial');
    }

    public function update($id, array $data)
    {
        return $this->executeOrFail(function () use ($id, $data) {
            $this->find($id);
            $this->validateTercero($data);

            return $this->repository->update($id, $data);
        }, 'Error al actualizar condición comercial');
    }

    public function find($id)
    {
        return $this->execute(function () use ($id) {
            $condicion = $this->repository->findBy('id', $id);

            if (! $condicion) {
                throw new NotFoundException('Condición comercial no encontrada');
            }

            return $condicion;
        }, 'Error al buscar condición comercial');
    }

    public function delete($id)
    {
        return $this->executeOrFail(function () use ($id) {
            $this->find($id);

            return $this->repository->delete($id);
        }, 'Error al eliminar condición comercial');
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
                'cliente_id' => 'Indica un cliente si la condición no es de un proveedor',
            ]);
        }
    }
}

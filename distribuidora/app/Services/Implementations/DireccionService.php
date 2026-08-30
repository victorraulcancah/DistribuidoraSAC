<?php

namespace App\Services\Implementations;

use App\Exceptions\NotFoundException;
use App\Exceptions\ValidationException;
use App\Repositories\Interfaces\DireccionRepositoryInterface;
use App\Services\Interfaces\DireccionServiceInterface;
use App\Traits\HandlesExceptions;

class DireccionService extends BaseService implements DireccionServiceInterface
{
    use HandlesExceptions;

    public function __construct(DireccionRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    public function create(array $data)
    {
        return $this->executeOrFail(function () use ($data) {
            $this->validateTercero($data);

            return $this->repository->create($data);
        }, 'Error al crear dirección');
    }

    public function update($id, array $data)
    {
        return $this->executeOrFail(function () use ($id, $data) {
            $this->find($id);
            $this->validateTercero($data);

            return $this->repository->update($id, $data);
        }, 'Error al actualizar dirección');
    }

    public function find($id)
    {
        return $this->execute(function () use ($id) {
            $direccion = $this->repository->findBy('id', $id);

            if (! $direccion) {
                throw new NotFoundException('Dirección no encontrada');
            }

            return $direccion;
        }, 'Error al buscar dirección');
    }

    public function delete($id)
    {
        return $this->executeOrFail(function () use ($id) {
            $this->find($id);

            return $this->repository->delete($id);
        }, 'Error al eliminar dirección');
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
                'cliente_id' => 'Indica un cliente si la dirección no es de un proveedor',
            ]);
        }
    }
}

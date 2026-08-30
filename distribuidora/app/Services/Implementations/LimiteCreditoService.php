<?php

namespace App\Services\Implementations;

use App\Exceptions\NotFoundException;
use App\Exceptions\ValidationException;
use App\Repositories\Interfaces\LimiteCreditoRepositoryInterface;
use App\Services\Interfaces\LimiteCreditoServiceInterface;
use App\Traits\HandlesExceptions;

class LimiteCreditoService extends BaseService implements LimiteCreditoServiceInterface
{
    use HandlesExceptions;

    public function __construct(LimiteCreditoRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    public function create(array $data)
    {
        return $this->executeOrFail(function () use ($data) {
            $this->validateTercero($data);

            return $this->repository->create($data);
        }, 'Error al crear límite de crédito');
    }

    public function update($id, array $data)
    {
        return $this->executeOrFail(function () use ($id, $data) {
            $this->find($id);
            $this->validateTercero($data);

            return $this->repository->update($id, $data);
        }, 'Error al actualizar límite de crédito');
    }

    public function find($id)
    {
        return $this->execute(function () use ($id) {
            $limite = $this->repository->findBy('id', $id);

            if (! $limite) {
                throw new NotFoundException('Límite de crédito no encontrado');
            }

            return $limite;
        }, 'Error al buscar límite de crédito');
    }

    public function delete($id)
    {
        return $this->executeOrFail(function () use ($id) {
            $this->find($id);

            return $this->repository->delete($id);
        }, 'Error al eliminar límite de crédito');
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
                'cliente_id' => 'Indica un cliente si el límite no es de un proveedor',
            ]);
        }
    }
}

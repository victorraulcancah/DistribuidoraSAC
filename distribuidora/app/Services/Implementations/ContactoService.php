<?php

namespace App\Services\Implementations;

use App\Exceptions\NotFoundException;
use App\Exceptions\ValidationException;
use App\Repositories\Interfaces\ContactoRepositoryInterface;
use App\Services\Interfaces\ContactoServiceInterface;
use App\Traits\HandlesExceptions;

class ContactoService extends BaseService implements ContactoServiceInterface
{
    use HandlesExceptions;

    public function __construct(ContactoRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    public function create(array $data)
    {
        return $this->executeOrFail(function () use ($data) {
            $this->validateTercero($data);

            return $this->repository->create($data);
        }, 'Error al crear contacto');
    }

    public function update($id, array $data)
    {
        return $this->executeOrFail(function () use ($id, $data) {
            $this->find($id);
            $this->validateTercero($data);

            return $this->repository->update($id, $data);
        }, 'Error al actualizar contacto');
    }

    public function find($id)
    {
        return $this->execute(function () use ($id) {
            $contacto = $this->repository->findBy('id', $id);

            if (! $contacto) {
                throw new NotFoundException('Contacto no encontrado');
            }

            return $contacto;
        }, 'Error al buscar contacto');
    }

    public function delete($id)
    {
        return $this->executeOrFail(function () use ($id) {
            $this->find($id);

            return $this->repository->delete($id);
        }, 'Error al eliminar contacto');
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
                'cliente_id' => 'Indica un cliente si el contacto no es de un proveedor',
            ]);
        }
    }
}

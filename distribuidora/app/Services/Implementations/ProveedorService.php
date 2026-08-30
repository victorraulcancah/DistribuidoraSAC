<?php

namespace App\Services\Implementations;

use App\Exceptions\NotFoundException;
use App\Exceptions\ValidationException;
use App\Repositories\Interfaces\ProveedorRepositoryInterface;
use App\Services\Interfaces\ProveedorServiceInterface;
use App\Traits\HandlesExceptions;

class ProveedorService extends BaseService implements ProveedorServiceInterface
{
    use HandlesExceptions;

    public function __construct(ProveedorRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    public function create(array $data)
    {
        return $this->executeOrFail(function () use ($data) {
            if (isset($data['numero_documento']) && $this->repository->findByDocumento($data['numero_documento'])) {
                throw new ValidationException('El documento ya está registrado', [
                    'numero_documento' => 'El documento ya está registrado',
                ]);
            }

            if (! isset($data['codigo']) || $data['codigo'] === '') {
                $data['codigo'] = $this->generateCodigo();
            }

            return $this->repository->create($data);
        }, 'Error al crear proveedor');
    }

    public function update($id, array $data)
    {
        return $this->executeOrFail(function () use ($id, $data) {
            $this->find($id);

            if (isset($data['numero_documento'])) {
                $existing = $this->repository->findByDocumento($data['numero_documento']);
                if ($existing && $existing->id !== $id) {
                    throw new ValidationException('El documento ya está registrado', [
                        'numero_documento' => 'El documento ya está registrado',
                    ]);
                }
            }

            return $this->repository->update($id, $data);
        }, 'Error al actualizar proveedor');
    }

    public function find($id)
    {
        return $this->execute(function () use ($id) {
            $proveedor = $this->repository->findBy('id', $id);

            if (! $proveedor) {
                throw new NotFoundException('Proveedor no encontrado');
            }

            return $proveedor;
        }, 'Error al buscar proveedor');
    }

    public function delete($id)
    {
        return $this->executeOrFail(function () use ($id) {
            $this->find($id);

            return $this->repository->delete($id);
        }, 'Error al eliminar proveedor');
    }

    public function paginate(int $perPage = 15, array $filters = [])
    {
        return $this->repository->paginate($perPage, $filters);
    }

    private function generateCodigo(): string
    {
        $count = $this->repository->all(['id'])->count() + 1;

        return 'PRO-'.str_pad((string) $count, 5, '0', STR_PAD_LEFT);
    }
}

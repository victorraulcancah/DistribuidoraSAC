<?php

namespace App\Services\Implementations;

use App\Exceptions\NotFoundException;
use App\Exceptions\ValidationException;
use App\Repositories\Interfaces\RoleRepositoryInterface;
use App\Services\Interfaces\RoleServiceInterface;
use App\Traits\HandlesExceptions;

class RoleService extends BaseService implements RoleServiceInterface
{
    use HandlesExceptions;

    public function __construct(RoleRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    public function paginate(int $perPage = 15, array $filters = [])
    {
        return $this->repository->paginate($perPage, $filters);
    }

    public function find($id)
    {
        return $this->execute(function () use ($id) {
            $role = $this->repository->findBy('id', $id);

            if (! $role) {
                throw new NotFoundException('Rol no encontrado');
            }

            return $role;
        }, 'Error al buscar rol');
    }

    public function create(array $data)
    {
        return $this->executeOrFail(function () use ($data) {
            $this->assertUniqueName($data['name']);

            return $this->repository->create($data);
        }, 'Error al crear rol');
    }

    public function update($id, array $data)
    {
        return $this->executeOrFail(function () use ($id, $data) {
            $this->find($id);
            $this->assertUniqueName($data['name'], $id);

            return $this->repository->update($id, $data);
        }, 'Error al actualizar rol');
    }

    public function delete($id)
    {
        return $this->executeOrFail(function () use ($id) {
            $role = $this->find($id);

            if ($role->users()->exists()) {
                throw new ValidationException('No se puede eliminar un rol asignado a usuarios', [
                    'role' => 'Reasigna los usuarios a otro rol antes de eliminar',
                ]);
            }

            return $this->repository->delete($id);
        }, 'Error al eliminar rol');
    }

    private function assertUniqueName(string $name, $ignoreId = null): void
    {
        $existing = $this->repository->findBy('name', $name);

        if ($existing && ($ignoreId === null || (int) $existing->id !== (int) $ignoreId)) {
            throw new ValidationException('Ya existe un rol con ese identificador', [
                'name' => 'El identificador ya está en uso',
            ]);
        }
    }
}

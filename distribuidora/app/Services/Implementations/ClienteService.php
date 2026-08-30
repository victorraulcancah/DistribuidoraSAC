<?php

namespace App\Services\Implementations;

use App\Exceptions\NotFoundException;
use App\Exceptions\ValidationException;
use App\Repositories\Interfaces\ClienteRepositoryInterface;
use App\Services\Interfaces\ClienteServiceInterface;
use App\Traits\HandlesExceptions;

class ClienteService extends BaseService implements ClienteServiceInterface
{
    use HandlesExceptions;

    public function __construct(ClienteRepositoryInterface $repository)
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
        }, 'Error al crear cliente');
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
        }, 'Error al actualizar cliente');
    }

    public function find($id)
    {
        return $this->execute(function () use ($id) {
            $cliente = $this->repository->findBy('id', $id);

            if (! $cliente) {
                throw new NotFoundException('Cliente no encontrado');
            }

            return $cliente;
        }, 'Error al buscar cliente');
    }

    public function delete($id)
    {
        return $this->executeOrFail(function () use ($id) {
            $this->find($id);

            return $this->repository->delete($id);
        }, 'Error al eliminar cliente');
    }

    public function paginate(int $perPage = 15, array $filters = [])
    {
        return $this->repository->paginate($perPage, $filters);
    }

    private function generateCodigo(): string
    {
        $count = $this->repository->all(['id'])->count() + 1;

        return 'CLI-'.str_pad((string) $count, 5, '0', STR_PAD_LEFT);
    }
}

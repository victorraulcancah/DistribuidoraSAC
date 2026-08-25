<?php

namespace App\Services\Implementations;

use App\Exceptions\NotFoundException;
use App\Exceptions\ValidationException;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Services\Interfaces\UserServiceInterface;
use App\Traits\HandlesExceptions;
use Illuminate\Support\Facades\Hash;

class UserService extends BaseService implements UserServiceInterface
{
    use HandlesExceptions;

    public function __construct(UserRepositoryInterface $repository)
    {
        parent::__construct($repository);
    }

    public function findByEmail(string $email)
    {
        return $this->execute(function () use ($email) {
            $user = $this->repository->findByEmail($email);
            
            if (!$user) {
                throw new NotFoundException("Usuario con email {$email} no encontrado");
            }
            
            return $user;
        }, 'Error al buscar usuario por email');
    }

    public function changePassword($id, string $newPassword)
    {
        return $this->executeOrFail(function () use ($id, $newPassword) {
            $user = $this->find($id);
            
            if (!$user) {
                throw new NotFoundException("Usuario no encontrado");
            }
            
            if (strlen($newPassword) < 8) {
                throw new ValidationException('La contraseña debe tener al menos 8 caracteres', [
                    'password' => 'La contraseña debe tener al menos 8 caracteres'
                ]);
            }
            
            $user->password = Hash::make($newPassword);
            $user->save();
            
            return $user;
        }, 'Error al cambiar contraseña');
    }

    public function create(array $data)
    {
        return $this->executeOrFail(function () use ($data) {
            if (isset($data['email']) && $this->repository->findByEmail($data['email'])) {
                throw new ValidationException('El email ya está registrado', [
                    'email' => 'El email ya está registrado'
                ]);
            }
            
            return $this->repository->create($data);
        }, 'Error al crear usuario');
    }
}
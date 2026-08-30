<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Services\Interfaces\UserServiceInterface;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected UserServiceInterface $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function index(Request $request)
    {
        $users = $this->userService->all();

        return response()->json([
            'success' => true,
            'message' => 'Usuarios obtenidos',
            'data' => UserResource::collection($users),
        ]);
    }

    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();
        $roleIds = $validated['role_ids'] ?? [];
        unset($validated['role_ids']);

        $user = $this->userService->create($validated);

        if (! empty($roleIds)) {
            $user->roles()->sync($roleIds);
        }

        return response()->json([
            'success' => true,
            'message' => 'Usuario creado exitosamente',
            'data' => new UserResource($user->load('roles:id,name,display_name')),
        ], 201);
    }

    public function show($id)
    {
        $user = $this->userService->find($id);

        return response()->json([
            'success' => true,
            'message' => 'Usuario obtenido',
            'data' => new UserResource($user->load('roles:id,name,display_name')),
        ]);
    }

    public function update(UpdateUserRequest $request, $id)
    {
        $validated = $request->validated();
        $roleIds = $validated['role_ids'] ?? [];
        unset($validated['role_ids']);
        unset($validated['password']);

        // La contraseña es opcional en edición: si llega, se rehash desde el cast.
        if ($request->filled('password')) {
            $validated['password'] = $request->input('password');
        }

        $user = $this->userService->update($id, $validated);

        if (! empty($roleIds)) {
            $user->roles()->sync($roleIds);
        }

        return response()->json([
            'success' => true,
            'message' => 'Usuario actualizado exitosamente',
            'data' => new UserResource($user->fresh()->load('roles:id,name,display_name')),
        ]);
    }

    public function destroy($id)
    {
        $this->userService->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Usuario eliminado exitosamente',
        ]);
    }
}

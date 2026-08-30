<?php

namespace App\Http\Controllers\Api\Roles;

use App\Http\Controllers\Controller;
use App\Http\Requests\Roles\StoreRoleRequest;
use App\Http\Requests\Roles\UpdateRoleRequest;
use App\Http\Resources\RoleResource;
use App\Services\Interfaces\RoleServiceInterface;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    protected RoleServiceInterface $roleService;

    public function __construct(RoleServiceInterface $roleService)
    {
        $this->roleService = $roleService;
    }

    public function index(Request $request)
    {
        $filters = [
            'search' => $request->query('search'),
            'estado' => $request->query('estado'),
        ];

        $roles = $this->roleService->paginate($request->query('per_page', 15), $filters);

        return response()->json([
            'success' => true,
            'message' => 'Roles obtenidos',
            'data' => RoleResource::collection($roles->items()),
            'pagination' => [
                'current_page' => $roles->currentPage(),
                'last_page' => $roles->lastPage(),
                'per_page' => $roles->perPage(),
                'total' => $roles->total(),
            ],
        ]);
    }

    public function store(StoreRoleRequest $request)
    {
        $role = $this->roleService->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Rol creado exitosamente',
            'data' => new RoleResource($role),
        ], 201);
    }

    public function show($id)
    {
        $role = $this->roleService->find($id);

        return response()->json([
            'success' => true,
            'message' => 'Rol obtenido',
            'data' => new RoleResource($role->loadCount('users')),
        ]);
    }

    public function update(UpdateRoleRequest $request, $id)
    {
        $role = $this->roleService->update($id, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Rol actualizado exitosamente',
            'data' => new RoleResource($role->fresh()->loadCount('users')),
        ]);
    }

    public function destroy($id)
    {
        $this->roleService->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Rol eliminado exitosamente',
        ]);
    }
}

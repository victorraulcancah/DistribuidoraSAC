<?php

namespace App\Http\Controllers\Api\Proveedores;

use App\Http\Controllers\Controller;
use App\Http\Requests\Proveedores\StoreProveedorRequest;
use App\Http\Requests\Proveedores\UpdateProveedorRequest;
use App\Http\Resources\ProveedorResource;
use App\Services\Interfaces\ProveedorServiceInterface;
use Illuminate\Http\Request;

class ProveedorController extends Controller
{
    protected ProveedorServiceInterface $proveedorService;

    public function __construct(ProveedorServiceInterface $proveedorService)
    {
        $this->proveedorService = $proveedorService;
    }

    public function index(Request $request)
    {
        $filters = [
            'search' => $request->query('search'),
            'estado' => $request->query('estado'),
        ];

        $proveedores = $this->proveedorService->paginate($request->query('per_page', 15), $filters);

        return response()->json([
            'success' => true,
            'message' => 'Proveedores obtenidos',
            'data' => ProveedorResource::collection($proveedores->items()),
            'pagination' => [
                'current_page' => $proveedores->currentPage(),
                'last_page' => $proveedores->lastPage(),
                'per_page' => $proveedores->perPage(),
                'total' => $proveedores->total(),
            ],
        ]);
    }

    public function store(StoreProveedorRequest $request)
    {
        $proveedor = $this->proveedorService->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Proveedor creado exitosamente',
            'data' => new ProveedorResource($proveedor),
        ], 201);
    }

    public function show($id)
    {
        $proveedor = $this->proveedorService->find($id);

        return response()->json([
            'success' => true,
            'message' => 'Proveedor obtenido',
            'data' => new ProveedorResource($proveedor),
        ]);
    }

    public function update(UpdateProveedorRequest $request, $id)
    {
        $proveedor = $this->proveedorService->update($id, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Proveedor actualizado exitosamente',
            'data' => new ProveedorResource($proveedor),
        ]);
    }

    public function destroy($id)
    {
        $this->proveedorService->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Proveedor eliminado exitosamente',
        ]);
    }
}

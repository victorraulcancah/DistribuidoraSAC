<?php

namespace App\Http\Controllers\Api\Direcciones;

use App\Http\Controllers\Controller;
use App\Http\Requests\Direcciones\StoreDireccionRequest;
use App\Http\Requests\Direcciones\UpdateDireccionRequest;
use App\Http\Resources\DireccionResource;
use App\Services\Interfaces\DireccionServiceInterface;
use Illuminate\Http\Request;

class DireccionController extends Controller
{
    protected DireccionServiceInterface $direccionService;

    public function __construct(DireccionServiceInterface $direccionService)
    {
        $this->direccionService = $direccionService;
    }

    public function index(Request $request)
    {
        $filters = [
            'search' => $request->query('search'),
            'estado' => $request->query('estado'),
            'cliente_id' => $request->query('cliente_id'),
            'proveedor_id' => $request->query('proveedor_id'),
        ];

        $direcciones = $this->direccionService->paginate($request->query('per_page', 15), $filters);

        return response()->json([
            'success' => true,
            'message' => 'Direcciones obtenidas',
            'data' => DireccionResource::collection($direcciones->items()),
            'pagination' => [
                'current_page' => $direcciones->currentPage(),
                'last_page' => $direcciones->lastPage(),
                'per_page' => $direcciones->perPage(),
                'total' => $direcciones->total(),
            ],
        ]);
    }

    public function store(StoreDireccionRequest $request)
    {
        $direccion = $this->direccionService->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Dirección creada exitosamente',
            'data' => new DireccionResource($direccion->load(['cliente:id,razon_social', 'proveedor:id,razon_social'])),
        ], 201);
    }

    public function show($id)
    {
        $direccion = $this->direccionService->find($id);

        return response()->json([
            'success' => true,
            'message' => 'Dirección obtenida',
            'data' => new DireccionResource($direccion->load(['cliente:id,razon_social', 'proveedor:id,razon_social'])),
        ]);
    }

    public function update(UpdateDireccionRequest $request, $id)
    {
        $direccion = $this->direccionService->update($id, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Dirección actualizada exitosamente',
            'data' => new DireccionResource($direccion->fresh(['cliente:id,razon_social', 'proveedor:id,razon_social'])),
        ]);
    }

    public function destroy($id)
    {
        $this->direccionService->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Dirección eliminada exitosamente',
        ]);
    }
}

<?php

namespace App\Http\Controllers\Api\HistorialComercial;

use App\Http\Controllers\Controller;
use App\Http\Requests\HistorialComercial\StoreHistorialComercialRequest;
use App\Http\Requests\HistorialComercial\UpdateHistorialComercialRequest;
use App\Http\Resources\HistorialComercialResource;
use App\Services\Interfaces\HistorialComercialServiceInterface;
use Illuminate\Http\Request;

class HistorialComercialController extends Controller
{
    protected HistorialComercialServiceInterface $historialService;

    public function __construct(HistorialComercialServiceInterface $historialService)
    {
        $this->historialService = $historialService;
    }

    public function index(Request $request)
    {
        $filters = [
            'search' => $request->query('search'),
            'estado' => $request->query('estado'),
            'cliente_id' => $request->query('cliente_id'),
            'proveedor_id' => $request->query('proveedor_id'),
        ];

        $registros = $this->historialService->paginate($request->query('per_page', 15), $filters);

        return response()->json([
            'success' => true,
            'message' => 'Historial comercial obtenido',
            'data' => HistorialComercialResource::collection($registros->items()),
            'pagination' => [
                'current_page' => $registros->currentPage(),
                'last_page' => $registros->lastPage(),
                'per_page' => $registros->perPage(),
                'total' => $registros->total(),
            ],
        ]);
    }

    public function store(StoreHistorialComercialRequest $request)
    {
        $registro = $this->historialService->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Registro de historial creado exitosamente',
            'data' => new HistorialComercialResource($registro->load(['cliente:id,razon_social', 'proveedor:id,razon_social'])),
        ], 201);
    }

    public function show($id)
    {
        $registro = $this->historialService->find($id);

        return response()->json([
            'success' => true,
            'message' => 'Registro de historial obtenido',
            'data' => new HistorialComercialResource($registro->load(['cliente:id,razon_social', 'proveedor:id,razon_social'])),
        ]);
    }

    public function update(UpdateHistorialComercialRequest $request, $id)
    {
        $registro = $this->historialService->update($id, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Registro de historial actualizado exitosamente',
            'data' => new HistorialComercialResource($registro->fresh(['cliente:id,razon_social', 'proveedor:id,razon_social'])),
        ]);
    }

    public function destroy($id)
    {
        $this->historialService->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Registro de historial eliminado exitosamente',
        ]);
    }
}

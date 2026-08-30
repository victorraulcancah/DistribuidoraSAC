<?php

namespace App\Http\Controllers\Api\LimitesCredito;

use App\Http\Controllers\Controller;
use App\Http\Requests\LimitesCredito\StoreLimiteCreditoRequest;
use App\Http\Requests\LimitesCredito\UpdateLimiteCreditoRequest;
use App\Http\Resources\LimiteCreditoResource;
use App\Services\Interfaces\LimiteCreditoServiceInterface;
use Illuminate\Http\Request;

class LimiteCreditoController extends Controller
{
    protected LimiteCreditoServiceInterface $limiteService;

    public function __construct(LimiteCreditoServiceInterface $limiteService)
    {
        $this->limiteService = $limiteService;
    }

    public function index(Request $request)
    {
        $filters = [
            'estado' => $request->query('estado'),
            'cliente_id' => $request->query('cliente_id'),
            'proveedor_id' => $request->query('proveedor_id'),
        ];

        $limites = $this->limiteService->paginate($request->query('per_page', 15), $filters);

        return response()->json([
            'success' => true,
            'message' => 'Límites de crédito obtenidos',
            'data' => LimiteCreditoResource::collection($limites->items()),
            'pagination' => [
                'current_page' => $limites->currentPage(),
                'last_page' => $limites->lastPage(),
                'per_page' => $limites->perPage(),
                'total' => $limites->total(),
            ],
        ]);
    }

    public function store(StoreLimiteCreditoRequest $request)
    {
        $limite = $this->limiteService->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Límite de crédito creado exitosamente',
            'data' => new LimiteCreditoResource($limite->load(['cliente:id,razon_social', 'proveedor:id,razon_social'])),
        ], 201);
    }

    public function show($id)
    {
        $limite = $this->limiteService->find($id);

        return response()->json([
            'success' => true,
            'message' => 'Límite de crédito obtenido',
            'data' => new LimiteCreditoResource($limite->load(['cliente:id,razon_social', 'proveedor:id,razon_social'])),
        ]);
    }

    public function update(UpdateLimiteCreditoRequest $request, $id)
    {
        $limite = $this->limiteService->update($id, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Límite de crédito actualizado exitosamente',
            'data' => new LimiteCreditoResource($limite->fresh(['cliente:id,razon_social', 'proveedor:id,razon_social'])),
        ]);
    }

    public function destroy($id)
    {
        $this->limiteService->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Límite de crédito eliminado exitosamente',
        ]);
    }
}

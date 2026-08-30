<?php

namespace App\Http\Controllers\Api\CondicionesComerciales;

use App\Http\Controllers\Controller;
use App\Http\Requests\CondicionesComerciales\StoreCondicionComercialRequest;
use App\Http\Requests\CondicionesComerciales\UpdateCondicionComercialRequest;
use App\Http\Resources\CondicionComercialResource;
use App\Services\Interfaces\CondicionComercialServiceInterface;
use Illuminate\Http\Request;

class CondicionComercialController extends Controller
{
    protected CondicionComercialServiceInterface $condicionService;

    public function __construct(CondicionComercialServiceInterface $condicionService)
    {
        $this->condicionService = $condicionService;
    }

    public function index(Request $request)
    {
        $filters = [
            'search' => $request->query('search'),
            'estado' => $request->query('estado'),
            'cliente_id' => $request->query('cliente_id'),
            'proveedor_id' => $request->query('proveedor_id'),
        ];

        $condiciones = $this->condicionService->paginate($request->query('per_page', 15), $filters);

        return response()->json([
            'success' => true,
            'message' => 'Condiciones comerciales obtenidas',
            'data' => CondicionComercialResource::collection($condiciones->items()),
            'pagination' => [
                'current_page' => $condiciones->currentPage(),
                'last_page' => $condiciones->lastPage(),
                'per_page' => $condiciones->perPage(),
                'total' => $condiciones->total(),
            ],
        ]);
    }

    public function store(StoreCondicionComercialRequest $request)
    {
        $condicion = $this->condicionService->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Condición comercial creada exitosamente',
            'data' => new CondicionComercialResource($condicion->load(['cliente:id,razon_social', 'proveedor:id,razon_social'])),
        ], 201);
    }

    public function show($id)
    {
        $condicion = $this->condicionService->find($id);

        return response()->json([
            'success' => true,
            'message' => 'Condición comercial obtenida',
            'data' => new CondicionComercialResource($condicion->load(['cliente:id,razon_social', 'proveedor:id,razon_social'])),
        ]);
    }

    public function update(UpdateCondicionComercialRequest $request, $id)
    {
        $condicion = $this->condicionService->update($id, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Condición comercial actualizada exitosamente',
            'data' => new CondicionComercialResource($condicion->fresh(['cliente:id,razon_social', 'proveedor:id,razon_social'])),
        ]);
    }

    public function destroy($id)
    {
        $this->condicionService->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Condición comercial eliminada exitosamente',
        ]);
    }
}

<?php

namespace App\Http\Controllers\Api\Clientes;

use App\Http\Controllers\Controller;
use App\Http\Requests\Clientes\StoreClienteRequest;
use App\Http\Requests\Clientes\UpdateClienteRequest;
use App\Http\Resources\ClienteResource;
use App\Services\Interfaces\ClienteServiceInterface;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    protected ClienteServiceInterface $clienteService;

    public function __construct(ClienteServiceInterface $clienteService)
    {
        $this->clienteService = $clienteService;
    }

    public function index(Request $request)
    {
        $filters = [
            'search' => $request->query('search'),
            'estado' => $request->query('estado'),
        ];

        $clientes = $this->clienteService->paginate($request->query('per_page', 15), $filters);

        return response()->json([
            'success' => true,
            'message' => 'Clientes obtenidos',
            'data' => ClienteResource::collection($clientes->items()),
            'pagination' => [
                'current_page' => $clientes->currentPage(),
                'last_page' => $clientes->lastPage(),
                'per_page' => $clientes->perPage(),
                'total' => $clientes->total(),
            ],
        ]);
    }

    public function store(StoreClienteRequest $request)
    {
        $cliente = $this->clienteService->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Cliente creado exitosamente',
            'data' => new ClienteResource($cliente->load('vendedor')),
        ], 201);
    }

    public function show($id)
    {
        $cliente = $this->clienteService->find($id);

        return response()->json([
            'success' => true,
            'message' => 'Cliente obtenido',
            'data' => new ClienteResource($cliente->load('vendedor')),
        ]);
    }

    public function update(UpdateClienteRequest $request, $id)
    {
        $cliente = $this->clienteService->update($id, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Cliente actualizado exitosamente',
            'data' => new ClienteResource($cliente->fresh('vendedor')),
        ]);
    }

    public function destroy($id)
    {
        $this->clienteService->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Cliente eliminado exitosamente',
        ]);
    }
}

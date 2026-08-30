<?php

namespace App\Http\Controllers\Api\Contactos;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contactos\StoreContactoRequest;
use App\Http\Requests\Contactos\UpdateContactoRequest;
use App\Http\Resources\ContactoResource;
use App\Services\Interfaces\ContactoServiceInterface;
use Illuminate\Http\Request;

class ContactoController extends Controller
{
    protected ContactoServiceInterface $contactoService;

    public function __construct(ContactoServiceInterface $contactoService)
    {
        $this->contactoService = $contactoService;
    }

    public function index(Request $request)
    {
        $filters = [
            'search' => $request->query('search'),
            'estado' => $request->query('estado'),
            'cliente_id' => $request->query('cliente_id'),
            'proveedor_id' => $request->query('proveedor_id'),
        ];

        $contactos = $this->contactoService->paginate($request->query('per_page', 15), $filters);

        return response()->json([
            'success' => true,
            'message' => 'Contactos obtenidos',
            'data' => ContactoResource::collection($contactos->items()),
            'pagination' => [
                'current_page' => $contactos->currentPage(),
                'last_page' => $contactos->lastPage(),
                'per_page' => $contactos->perPage(),
                'total' => $contactos->total(),
            ],
        ]);
    }

    public function store(StoreContactoRequest $request)
    {
        $contacto = $this->contactoService->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Contacto creado exitosamente',
            'data' => new ContactoResource($contacto->load(['cliente:id,razon_social', 'proveedor:id,razon_social'])),
        ], 201);
    }

    public function show($id)
    {
        $contacto = $this->contactoService->find($id);

        return response()->json([
            'success' => true,
            'message' => 'Contacto obtenido',
            'data' => new ContactoResource($contacto->load(['cliente:id,razon_social', 'proveedor:id,razon_social'])),
        ]);
    }

    public function update(UpdateContactoRequest $request, $id)
    {
        $contacto = $this->contactoService->update($id, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Contacto actualizado exitosamente',
            'data' => new ContactoResource($contacto->fresh(['cliente:id,razon_social', 'proveedor:id,razon_social'])),
        ]);
    }

    public function destroy($id)
    {
        $this->contactoService->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Contacto eliminado exitosamente',
        ]);
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'cliente_id' => $this->cliente_id,
            'proveedor_id' => $this->proveedor_id,
            'cliente' => $this->whenLoaded('cliente', function () {
                return $this->cliente ? ['id' => $this->cliente->id, 'razon_social' => $this->cliente->razon_social] : null;
            }),
            'proveedor' => $this->whenLoaded('proveedor', function () {
                return $this->proveedor ? ['id' => $this->proveedor->id, 'razon_social' => $this->proveedor->razon_social] : null;
            }),
            'nombre' => $this->nombre,
            'cargo' => $this->cargo,
            'telefono' => $this->telefono,
            'email' => $this->email,
            'es_principal' => $this->es_principal,
            'estado' => $this->estado,
            'notas' => $this->notas,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }
}

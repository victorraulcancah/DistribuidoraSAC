<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClienteResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'codigo' => $this->codigo,
            'tipo_documento' => $this->tipo_documento,
            'numero_documento' => $this->numero_documento,
            'razon_social' => $this->razon_social,
            'nombre_comercial' => $this->nombre_comercial,
            'telefono' => $this->telefono,
            'email' => $this->email,
            'direccion' => $this->direccion,
            'departamento' => $this->departamento,
            'provincia' => $this->provincia,
            'distrito' => $this->distrito,
            'vendedor' => $this->whenLoaded('vendedor', function () {
                return $this->vendedor
                    ? ['id' => $this->vendedor->id, 'name' => $this->vendedor->name]
                    : null;
            }),
            'vendedor_id' => $this->vendedor_id,
            'limite_credito' => $this->limite_credito !== null ? (float) $this->limite_credito : null,
            'dias_credito' => $this->dias_credito,
            'estado' => $this->estado,
            'notas' => $this->notas,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }
}

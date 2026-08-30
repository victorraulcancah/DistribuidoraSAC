<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LimiteCreditoResource extends JsonResource
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
            'monto_limite' => (float) $this->monto_limite,
            'dias_maximo' => $this->dias_maximo,
            'vigencia_desde' => $this->vigencia_desde?->format('Y-m-d'),
            'vigencia_hasta' => $this->vigencia_hasta?->format('Y-m-d'),
            'estado' => $this->estado,
            'notas' => $this->notas,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }
}

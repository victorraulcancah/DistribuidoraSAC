<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HistorialComercialResource extends JsonResource
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
            'tipo_movimiento' => $this->tipo_movimiento,
            'documento' => $this->documento,
            'fecha' => $this->fecha?->format('Y-m-d'),
            'monto' => (float) $this->monto,
            'estado' => $this->estado,
            'notas' => $this->notas,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }
}

<?php

namespace App\Http\Requests\LimitesCredito;

use Illuminate\Foundation\Http\FormRequest;

class StoreLimiteCreditoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'cliente_id' => ['nullable', 'exists:clientes,id'],
            'proveedor_id' => ['nullable', 'exists:proveedores,id'],
            'monto_limite' => ['required', 'numeric', 'min:0'],
            'dias_maximo' => ['nullable', 'integer', 'min:0', 'max:3650'],
            'vigencia_desde' => ['nullable', 'date'],
            'vigencia_hasta' => ['nullable', 'date', 'after_or_equal:vigencia_desde'],
            'estado' => ['nullable', 'string', 'in:Activo,Inactivo'],
            'notas' => ['nullable', 'string'],
        ];
    }
}

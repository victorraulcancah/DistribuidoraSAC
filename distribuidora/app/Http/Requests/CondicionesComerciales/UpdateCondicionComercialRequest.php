<?php

namespace App\Http\Requests\CondicionesComerciales;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCondicionComercialRequest extends FormRequest
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
            'tipologia' => ['nullable', 'string', 'in:Mascota,Venta,Compra,Ambos'],
            'forma_pago' => ['nullable', 'string', 'in:Contado,Credito,Contado-Credito'],
            'dias_credito' => ['nullable', 'integer', 'min:0', 'max:3650'],
            'tasa_descuento' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'dias_descuento' => ['nullable', 'integer', 'min:0', 'max:3650'],
            'tipo_cambio_factor' => ['nullable', 'string', 'in:venta,compra'],
            'estado' => ['nullable', 'string', 'in:Activo,Inactivo'],
            'notas' => ['nullable', 'string'],
        ];
    }
}

<?php

namespace App\Http\Requests\HistorialComercial;

use Illuminate\Foundation\Http\FormRequest;

class StoreHistorialComercialRequest extends FormRequest
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
            'tipo_movimiento' => ['nullable', 'string', 'in:Compra,Venta,Cobro,Pago,Devolucion,NotaCredito,NotaDebito,Otro'],
            'documento' => ['nullable', 'string', 'max:100'],
            'fecha' => ['nullable', 'date'],
            'monto' => ['required', 'numeric', 'min:0'],
            'estado' => ['nullable', 'string', 'in:Registrado,Procesado,Anulado'],
            'notas' => ['nullable', 'string'],
        ];
    }
}

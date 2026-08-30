<?php

namespace App\Http\Requests\Direcciones;

use Illuminate\Foundation\Http\FormRequest;

class StoreDireccionRequest extends FormRequest
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
            'tipo' => ['nullable', 'string', 'in:Principal,Envio,Facturacion,Almacen,Otro'],
            'direccion' => ['required', 'string', 'max:255'],
            'departamento' => ['nullable', 'string', 'max:100'],
            'provincia' => ['nullable', 'string', 'max:100'],
            'distrito' => ['nullable', 'string', 'max:100'],
            'referencia' => ['nullable', 'string', 'max:255'],
            'telefono' => ['nullable', 'string', 'max:20'],
            'es_principal' => ['nullable', 'boolean'],
            'estado' => ['nullable', 'string', 'in:Activo,Inactivo'],
        ];
    }
}

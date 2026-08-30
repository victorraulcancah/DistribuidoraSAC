<?php

namespace App\Http\Requests\Clientes;

use Illuminate\Foundation\Http\FormRequest;

class StoreClienteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'codigo' => ['nullable', 'string', 'max:20', 'unique:clientes,codigo'],
            'tipo_documento' => ['required', 'string', 'in:DNI,RUC,CE,Carnet Extranjeria,Pasaporte,Otro'],
            'numero_documento' => ['required', 'string', 'max:20', 'unique:clientes,numero_documento'],
            'razon_social' => ['required', 'string', 'max:255'],
            'nombre_comercial' => ['nullable', 'string', 'max:255'],
            'telefono' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:255'],
            'direccion' => ['nullable', 'string', 'max:255'],
            'departamento' => ['nullable', 'string', 'max:100'],
            'provincia' => ['nullable', 'string', 'max:100'],
            'distrito' => ['nullable', 'string', 'max:100'],
            'vendedor_id' => ['nullable', 'exists:users,id'],
            'limite_credito' => ['nullable', 'numeric', 'min:0'],
            'dias_credito' => ['nullable', 'integer', 'min:0', 'max:3650'],
            'estado' => ['nullable', 'string', 'in:Activo,Inactivo,Moroso'],
            'notas' => ['nullable', 'string'],
        ];
    }
}

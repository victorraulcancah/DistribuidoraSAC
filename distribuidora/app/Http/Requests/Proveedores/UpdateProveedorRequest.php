<?php

namespace App\Http\Requests\Proveedores;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProveedorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $proveedor = $this->route('proveedor');

        return [
            'codigo' => ['nullable', 'string', 'max:20', Rule::unique('proveedores', 'codigo')->ignore($proveedor)],
            'tipo_documento' => ['required', 'string', 'in:DNI,RUC,CE,Carnet Extranjeria,Pasaporte,Otro'],
            'numero_documento' => ['required', 'string', 'max:20', Rule::unique('proveedores', 'numero_documento')->ignore($proveedor)],
            'razon_social' => ['required', 'string', 'max:255'],
            'nombre_comercial' => ['nullable', 'string', 'max:255'],
            'telefono' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:255'],
            'direccion' => ['nullable', 'string', 'max:255'],
            'departamento' => ['nullable', 'string', 'max:100'],
            'provincia' => ['nullable', 'string', 'max:100'],
            'distrito' => ['nullable', 'string', 'max:100'],
            'limite_credito' => ['nullable', 'numeric', 'min:0'],
            'dias_credito' => ['nullable', 'integer', 'min:0', 'max:3650'],
            'estado' => ['nullable', 'string', 'in:Activo,Inactivo'],
            'notas' => ['nullable', 'string'],
        ];
    }
}

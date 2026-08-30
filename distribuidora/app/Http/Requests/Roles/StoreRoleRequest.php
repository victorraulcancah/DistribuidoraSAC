<?php

namespace App\Http\Requests\Roles;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100', 'unique:roles,name'],
            'display_name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:500'],
            'estado' => ['nullable', 'string', 'in:Activo,Inactivo'],
        ];
    }
}

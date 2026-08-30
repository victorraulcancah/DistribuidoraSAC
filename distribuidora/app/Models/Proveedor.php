<?php

namespace App\Models;

use Database\Factories\ProveedorFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'codigo',
    'tipo_documento',
    'numero_documento',
    'razon_social',
    'nombre_comercial',
    'telefono',
    'email',
    'direccion',
    'departamento',
    'provincia',
    'distrito',
    'limite_credito',
    'dias_credito',
    'estado',
    'notas',
])]
class Proveedor extends Model
{
    /** @use HasFactory<ProveedorFactory> */
    use HasFactory;

    protected $table = 'proveedores';

    protected function casts(): array
    {
        return [
            'limite_credito' => 'decimal:2',
            'dias_credito' => 'integer',
        ];
    }
}

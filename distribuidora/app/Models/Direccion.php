<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'cliente_id',
    'proveedor_id',
    'tipo',
    'direccion',
    'departamento',
    'provincia',
    'distrito',
    'referencia',
    'telefono',
    'es_principal',
    'estado',
])]
class Direccion extends Model
{
    protected $table = 'direcciones';

    protected function casts(): array
    {
        return [
            'es_principal' => 'boolean',
        ];
    }

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class);
    }
}

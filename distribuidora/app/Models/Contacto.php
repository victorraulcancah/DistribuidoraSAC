<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'cliente_id',
    'proveedor_id',
    'nombre',
    'cargo',
    'telefono',
    'email',
    'es_principal',
    'estado',
    'notas',
])]
class Contacto extends Model
{
    protected $table = 'contactos';

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

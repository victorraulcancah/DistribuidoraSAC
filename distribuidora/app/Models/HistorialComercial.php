<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'cliente_id',
    'proveedor_id',
    'tipo_movimiento',
    'documento',
    'fecha',
    'monto',
    'estado',
    'notas',
])]
class HistorialComercial extends Model
{
    protected $table = 'historial_comercial';

    protected function casts(): array
    {
        return [
            'fecha' => 'date',
            'monto' => 'decimal:2',
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

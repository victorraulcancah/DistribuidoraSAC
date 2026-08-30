<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'cliente_id',
    'proveedor_id',
    'tipologia',
    'forma_pago',
    'dias_credito',
    'tasa_descuento',
    'dias_descuento',
    'tipo_cambio_factor',
    'estado',
    'notas',
])]
class CondicionComercial extends Model
{
    protected $table = 'condiciones_comerciales';

    protected function casts(): array
    {
        return [
            'dias_credito' => 'integer',
            'tasa_descuento' => 'decimal:2',
            'dias_descuento' => 'integer',
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

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'cliente_id',
    'proveedor_id',
    'monto_limite',
    'dias_maximo',
    'vigencia_desde',
    'vigencia_hasta',
    'estado',
    'notas',
])]
class LimiteCredito extends Model
{
    protected $table = 'limites_credito';

    protected function casts(): array
    {
        return [
            'monto_limite' => 'decimal:2',
            'dias_maximo' => 'integer',
            'vigencia_desde' => 'date',
            'vigencia_hasta' => 'date',
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

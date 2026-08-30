<?php

namespace App\Models;

use Database\Factories\ClienteFactory;
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
    'vendedor_id',
    'limite_credito',
    'dias_credito',
    'estado',
    'notas',
])]
class Cliente extends Model
{
    /** @use HasFactory<ClienteFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'limite_credito' => 'decimal:2',
            'dias_credito' => 'integer',
        ];
    }

    public function vendedor()
    {
        return $this->belongsTo(User::class, 'vendedor_id');
    }
}

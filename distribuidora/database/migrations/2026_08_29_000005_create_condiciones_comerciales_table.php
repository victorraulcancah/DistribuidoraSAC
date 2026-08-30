<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('condiciones_comerciales', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cliente_id')->nullable()->constrained('clientes')->cascadeOnDelete();
            $table->foreignId('proveedor_id')->nullable()->constrained('proveedores')->cascadeOnDelete();
            $table->string('tipologia', 30)->default('Venta');
            $table->string('forma_pago', 30)->default('Contado');
            $table->unsignedSmallInteger('dias_credito')->default(0);
            $table->decimal('tasa_descuento', 5, 2)->default(0);
            $table->unsignedSmallInteger('dias_descuento')->default(0);
            $table->string('tipo_cambio_factor', 30)->nullable();
            $table->string('estado', 20)->default('Activo');
            $table->text('notas')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('condiciones_comerciales');
    }
};

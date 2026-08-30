<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // Roles que pinta el CRUD de usuarios (Configuración → Usuarios).
        $roles = [
            [
                'name' => 'super-admin',
                'display_name' => 'Super Administrador',
                'description' => 'Acceso total a todos los sistemas, módulos y configuración.',
            ],
            [
                'name' => 'admin',
                'display_name' => 'Administrador',
                'description' => 'Administra usuarios, clientes, proveedores y la operación diaria.',
            ],
            [
                'name' => 'contador',
                'display_name' => 'Contador',
                'description' => 'Finanzas, contabilidad, tesorería y reportes contables.',
            ],
            [
                'name' => 'ventas',
                'display_name' => 'Ventas',
                'description' => 'Cotizaciones, pedidos y seguimiento de clientes.',
            ],
            [
                'name' => 'almacen',
                'display_name' => 'Almacén',
                'description' => 'Recepción, inventario y picking de mercadería.',
            ],
            [
                'name' => 'despacho',
                'display_name' => 'Despacho',
                'description' => 'Planificación de rutas, unidades y entregas.',
            ],
            [
                'name' => 'rrhh',
                'display_name' => 'RR. HH.',
                'description' => 'Empleados, asistencia, nómina y desempeño.',
            ],
            [
                'name' => 'lectura',
                'display_name' => 'Solo lectura',
                'description' => 'Usuario visualizador: puede ver información sin editar.',
            ],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['name' => $role['name']],
                $role
            );
        }

        // Asignaciones por defecto a los usuarios existentes.
        $superAdmin = Role::where('name', 'super-admin')->first();
        $admin = Role::where('name', 'admin')->first();

        $super = User::where('email', 'admin@distribuidora.com')->first();
        if ($super && $superAdmin) {
            $super->roles()->syncWithoutDetaching([$superAdmin->id]);
        }

        $casual = User::where('email', 'distribuidorasac@distribuidora.com')->first();
        if ($casual && $admin) {
            $casual->roles()->syncWithoutDetaching([$admin->id]);
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            ['name' => 'administrador', 'display_name' => 'Administrador', 'description' => 'Acceso total a todos los sistemas de la suite.'],
            ['name' => 'ventas', 'display_name' => 'Ventas', 'description' => 'Ventas, cotizaciones y facturación.'],
            ['name' => 'almacen', 'display_name' => 'Almacén', 'description' => 'Recepción, almacenamiento y despacho.'],
            ['name' => 'rrhh', 'display_name' => 'RR. HH.', 'description' => 'Empleados, asistencia y nómina.'],
        ];

        foreach ($roles as $data) {
            Role::updateOrCreate(['name' => $data['name']], [
                'display_name' => $data['display_name'],
                'description' => $data['description'],
                'estado' => 'Activo',
            ]);
        }

        $adminRole = Role::where('name', 'administrador')->first();

        $admin = User::firstOrCreate(
            ['email' => 'admin@distribuidora.com'],
            [
                'name' => 'Administrador',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
            ]
        );

        if ($adminRole) {
            $admin->roles()->syncWithoutDetaching([$adminRole->id]);
        }
    }
}

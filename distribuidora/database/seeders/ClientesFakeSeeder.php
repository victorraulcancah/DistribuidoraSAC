<?php

namespace Database\Seeders;

use App\Models\Cliente;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClientesFakeSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $vendedorId = User::query()
            ->where('email', 'admin@distribuidora.com')
            ->value('id');

        $nombres = ['Carlos', 'María', 'Jorge', 'Lucía', 'Pedro', 'Ana', 'Luis', 'Rosa', 'Miguel', 'Carmen', 'José', 'Diana', 'Raúl', 'Sofía', 'Hugo', 'Elena', 'Víctor', 'Patricia', 'Fernando', 'Silvia'];
        $apellidos = ['García', 'Rodríguez', 'Martínez', 'López', 'Hernández', 'González', 'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores', 'Rivera', 'Castillo', 'Ramos', 'Chávez', 'Vargas', 'Castro', 'Ortega', 'Mendoza', 'Salazar'];

        $razones = ['Comercial', 'Distribuciones', 'Inversiones', 'Corporación', 'Industrias', 'Agroexport', 'Servicios', 'Grupo', 'Transportes', 'Ferretería', 'Bodega', 'Mini Market', 'Autopartes', 'Textil', 'Farmacia', 'Restaurante', 'Panadería', 'Frutas', 'Abarrotes', 'Plásticos'];
        $sufijos = ['S.A.C.', 'E.I.R.L.', 'S.A.', 'S.R.L.', 'S.C.R.L.'];

        $localidades = [
            ['Lima', 'Lima', 'Miraflores'],
            ['Lima', 'Lima', 'San Isidro'],
            ['Lima', 'Lima', 'Santiago de Surco'],
            ['Lima', 'Lima', 'Los Olivos'],
            ['Lima', 'Lima', 'Comas'],
            ['Lima', 'Lima', 'Villa El Salvador'],
            ['Lima', 'Lima', 'La Molina'],
            ['Lima', 'Lima', 'San Juan de Lurigancho'],
            ['Arequipa', 'Arequipa', 'Cayma'],
            ['Arequipa', 'Arequipa', 'Cerro Colorado'],
            ['Arequipa', 'Arequipa', 'Paucarpata'],
            ['La Libertad', 'Trujillo', 'Trujillo'],
            ['La Libertad', 'Trujillo', 'Víctor Larco Herrera'],
            ['Cusco', 'Cusco', 'Wanchaq'],
            ['Cusco', 'Cusco', 'San Sebastián'],
            ['Piura', 'Piura', 'Castilla'],
            ['Piura', 'Piura', 'Piura'],
            ['Lambayeque', 'Chiclayo', 'Chiclayo'],
            ['Lambayeque', 'Chiclayo', 'José Leonardo Ortiz'],
            ['Ica', 'Ica', 'Ica'],
            ['Junín', 'Huancayo', 'Huancayo'],
            ['Loreto', 'Maynas', 'Iquitos'],
            ['Puno', 'Puno', 'Juliaca'],
            ['Áncash', 'Santa', 'Chimbote'],
            ['Callao', 'Callao', 'Callao'],
        ];

        $calles = ['Av. Los Alamos', 'Jr. Las Flores', 'Av. Industrial', 'Calle Los Pinos', 'Av. Principal', 'Jr. San Martín', 'Av. Los Olivos', 'Calle Las Palmeras', 'Av. Prolongación', 'Jr. Los Claveles', 'Av. Universitaria', 'Calle El Sol', 'Av. Grau', 'Jr. Amazonas', 'Av. La Cultura'];
        $vias = ['Mza.', 'Lt.', 'N°', 'Cruce con'];
        $notas = [null, null, 'Cliente frecuente, pagos puntuales.', 'Atender solo por teléfono.', 'Requiere factura electrónica.', 'Cliente de campaña, coordinar stock.', 'Compra mensual por volumen.', null, 'Solicita crédito a 60 días.', null];

        $estados = ['Activo', 'Activo', 'Activo', 'Activo', 'Activo', 'Activo', 'Inactivo', 'Moroso'];
        $tipos = ['RUC', 'RUC', 'RUC', 'DNI', 'DNI', 'CE', 'Otro'];

        $existentes = Cliente::query()->pluck('numero_documento')->flip();

        $clientes = [];
        $total = 60;
        $i = 0;

        while (count($clientes) < $total) {
            $i++;
            $esEmpresa = rand(0, 1) === 1;

            if ($esEmpresa) {
                $tipoDocumento = 'RUC';
                $numero = '2' . str_pad((string) rand(0, 99999999), 11, '0', STR_PAD_LEFT);
                $razonSocial = $razones[array_rand($razones)] . ' ' . $apellidos[array_rand($apellidos)] . ' ' . $apellidos[array_rand($apellidos)] . ' ' . $sufijos[array_rand($sufijos)];
                $nombreComercial = str_replace(['Comercial ', 'Distribuciones ', 'Inversiones ', 'Corporación ', 'Industrias ', 'Agroexport ', 'Servicios ', 'Grupo ', 'Transportes ', 'Ferretería ', 'Bodega ', 'Mini Market ', 'Autopartes ', 'Textil ', 'Farmacia ', 'Restaurante ', 'Panadería ', 'Frutas ', 'Abarrotes ', 'Plásticos '], '', $razonSocial);
            } else {
                $tipoDocumento = rand(0, 1) === 1 ? 'DNI' : ($tipos[array_rand($tipos)]);
                $numero = (string) rand(10000000, 99999999);
                $razonSocial = $nombres[array_rand($nombres)] . ' ' . $apellidos[array_rand($apellidos)] . ' ' . $apellidos[array_rand($apellidos)];
                $nombreComercial = null;
            }

            if (isset($existentes[$numero]) || in_array($numero, array_column($clientes, 'numero_documento'))) {
                continue;
            }

            $localidad = $localidades[array_rand($localidades)];
            $dominio = $esEmpresa ? 'com.pe' : ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'][array_rand(['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'])];

            $clientes[] = [
                'codigo' => 'CLI-' . str_pad((string) (13 + count($clientes) + 1), 5, '0', STR_PAD_LEFT),
                'tipo_documento' => $tipoDocumento,
                'numero_documento' => $numero,
                'razon_social' => $razonSocial,
                'nombre_comercial' => $nombreComercial,
                'telefono' => '51' . str_pad((string) rand(100000000, 999999999), 9, '0', STR_PAD_LEFT),
                'email' => strtolower(preg_replace('/[^a-z0-9]/i', '', str_replace(['S.A.C.', 'E.I.R.L.', 'S.R.L.', 'S.C.R.L.', 'S.A.'], '', $razonSocial)) . rand(1, 99) . '@' . $dominio),
                'direccion' => $calles[array_rand($calles)] . ' ' . $vias[array_rand($vias)] . ' ' . rand(100, 5000),
                'departamento' => $localidad[0],
                'provincia' => $localidad[1],
                'distrito' => $localidad[2],
                'vendedor_id' => rand(0, 1) === 1 ? $vendedorId : null,
                'limite_credito' => rand(2, 30) * 1000,
                'dias_credito' => [15, 30, 45, 60][array_rand([15, 30, 45, 60])],
                'estado' => $estados[array_rand($estados)],
                'notas' => $notas[array_rand($notas)],
            ];
        }

        foreach ($clientes as $cliente) {
            Cliente::create($cliente);
        }

        $this->command?->info("Se crearon " . count($clientes) . " clientes falsos.");
    }
}

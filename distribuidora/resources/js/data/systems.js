import {
  LayoutDashboard,
  Warehouse,
  Truck,
  PackageCheck,
  BriefcaseBusiness,
} from 'lucide-react';

/**
 * Fuente única de verdad de los sistemas.
 *
 * `color` es lo ÚNICO que define la identidad visual: de ese hex se derivan
 * la tarjeta, el panel, la pestaña del carrusel, la barra de progreso, el
 * resplandor y los gráficos (ver lib/systemTheme.js). Cambiar el hex aquí
 * repinta el sistema entero.
 */
export const systems = [
  {
    id: 'ERP',
    color: '#2CD431',
    icon: LayoutDashboard,
    full: 'Planificación de Recursos Empresariales',
    description: 'Finanzas, compras, inventario y ventas sobre la misma información.',
    modules: 17,
    // Textos del carrusel del login
    headline: 'Qué pedidos y ventas existen',
    pitch: 'Finanzas, compras, inventario y ventas sobre la misma información. Aquí nace el pedido que recorre toda la operación.',
  },
  {
    id: 'WMS',
    color: '#0EA5E9',
    icon: Warehouse,
    full: 'Sistema de Gestión de Almacenes',
    description: 'Recepción, almacenamiento, picking y despacho de mercadería.',
    modules: 13,
    headline: 'Qué mercadería preparar y cargar',
    pitch: 'Ubicaciones, picking por olas y trazabilidad completa. El almacén sabe qué sale antes de que llegue el camión.',
  },
  {
    id: 'TMS',
    color: '#8B5CF6',
    icon: Truck,
    full: 'Sistema de Gestión de Transporte',
    description: 'Flota, rutas, tracking y liquidación de reparto.',
    modules: 12,
    headline: 'Qué vehículo, conductor y ruta',
    pitch: 'Planifica despachos, asigna unidad y chofer, y sigue cada ruta por GPS desde el mismo panel.',
  },
  {
    id: 'DMS',
    color: '#F43F5E',
    icon: PackageCheck,
    full: 'Distribución y Despacho',
    description: 'Entregas, devoluciones y rechazos confirmados en campo.',
    modules: 8,
    headline: 'Qué pasó realmente en cada cliente',
    pitch: 'Entrega, devolución, rechazo y recojo confirmados en campo. La liquidación del repartidor vuelve al almacén y a contabilidad.',
  },
  {
    id: 'RRHH',
    color: '#F59E0B',
    icon: BriefcaseBusiness,
    full: 'Recursos Humanos (RR. HH.)',
    description: 'Empleados, asistencia, nómina y evaluación de desempeño.',
    modules: 19,
    headline: 'Tu gente, del ingreso a la nómina',
    pitch: 'Empleados, asistencia, vacaciones, nómina y desempeño. Un solo lugar para todo el equipo.',
  },
];

export const getSystem = (id) => systems.find((s) => s.id === id);

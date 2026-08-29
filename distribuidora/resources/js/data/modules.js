import {
  Gauge,
  Database,
  ArrowDownToLine,
  ArrowUpFromLine,
  CheckCheck,
  LayoutDashboard,
  Users,
  Truck,
  Package,
  Tags,
  DollarSign,
  ShoppingCart,
  ClipboardList,
  Receipt,
  FileText,
  FileMinus,
  ArrowDownCircle,
  ArrowUpCircle,
  Landmark,
  BookOpen,
  BarChart3,
  PackageOpen,
  MapPin,
  Boxes,
  Layers,
  Hand,
  PackageCheck,
  Send,
  ArrowLeftRight,
  ClipboardCheck,
  Settings2,
  Undo2,
  Car,
  IdCard,
  Route,
  CalendarRange,
  Navigation,
  ScrollText,
  Fuel,
  Wrench,
  Coins,
  ListChecks,
  XCircle,
  Recycle,
  UserRound,
  FileSignature,
  Fingerprint,
  Clock,
  CalendarClock,
  Palmtree,
  MailQuestion,
  HeartPulse,
  Wallet,
  FileBadge,
  TrendingDown,
  Gift,
  Star,
  GraduationCap,
  Network,
} from 'lucide-react';

/**
 * Módulos de cada sistema, agrupados por sección para el sidebar.
 *
 * El conteo que se muestra en las tarjetas se calcula desde aquí
 * (ver `countModules`), así no puede quedar desincronizado.
 */
export const modulesBySystem = {
  ERP: [
    {
      group: 'General',
      icon: Gauge,
      items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }],
    },
    {
      group: 'Maestros',
      icon: Database,
      items: [
        { id: 'clientes', label: 'Clientes', icon: Users },
        { id: 'proveedores', label: 'Proveedores', icon: Truck },
        { id: 'productos', label: 'Productos', icon: Package },
        { id: 'categorias', label: 'Categorías', icon: Tags },
        { id: 'precios', label: 'Lista de precios', icon: DollarSign },
      ],
    },
    {
      group: 'Comercial',
      icon: ShoppingCart,
      items: [
        { id: 'compras', label: 'Compras', icon: ShoppingCart },
        { id: 'ordenes-compra', label: 'Órdenes de compra', icon: ClipboardList },
        { id: 'ventas', label: 'Ventas', icon: Receipt },
        { id: 'cotizaciones', label: 'Cotizaciones', icon: FileText },
        { id: 'facturacion', label: 'Facturación', icon: FileText },
        { id: 'notas-credito', label: 'Notas de crédito', icon: FileMinus },
      ],
    },
    {
      group: 'Finanzas',
      icon: Landmark,
      items: [
        { id: 'cxc', label: 'Cuentas por cobrar', icon: ArrowDownCircle },
        { id: 'cxp', label: 'Cuentas por pagar', icon: ArrowUpCircle },
        { id: 'caja-bancos', label: 'Caja y bancos', icon: Landmark },
        { id: 'contabilidad', label: 'Contabilidad', icon: BookOpen },
        { id: 'reportes', label: 'Reportes', icon: BarChart3 },
      ],
    },
  ],

  WMS: [
    {
      group: 'General',
      icon: Gauge,
      items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }],
    },
    {
      group: 'Entradas',
      icon: ArrowDownToLine,
      items: [
        { id: 'recepcion', label: 'Recepción', icon: PackageOpen },
        { id: 'ubicaciones', label: 'Ubicaciones', icon: MapPin },
        { id: 'stock', label: 'Stock', icon: Boxes },
        { id: 'lotes', label: 'Lotes y series', icon: Layers },
      ],
    },
    {
      group: 'Salidas',
      icon: ArrowUpFromLine,
      items: [
        { id: 'picking', label: 'Picking', icon: Hand },
        { id: 'packing', label: 'Packing', icon: PackageCheck },
        { id: 'despacho', label: 'Despacho', icon: Send },
        { id: 'transferencias', label: 'Transferencias', icon: ArrowLeftRight },
      ],
    },
    {
      group: 'Control',
      icon: ClipboardCheck,
      items: [
        { id: 'inventario', label: 'Inventario cíclico', icon: ClipboardCheck },
        { id: 'ajustes', label: 'Ajustes', icon: Settings2 },
        { id: 'devoluciones', label: 'Devoluciones', icon: Undo2 },
        { id: 'reportes', label: 'Reportes', icon: BarChart3 },
      ],
    },
  ],

  TMS: [
    {
      group: 'General',
      icon: Gauge,
      items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }],
    },
    {
      group: 'Recursos',
      icon: Car,
      items: [
        { id: 'flota', label: 'Flota', icon: Car },
        { id: 'conductores', label: 'Conductores', icon: IdCard },
        { id: 'rutas', label: 'Rutas', icon: Route },
      ],
    },
    {
      group: 'Operación',
      icon: Route,
      items: [
        { id: 'planificacion', label: 'Planificación', icon: CalendarRange },
        { id: 'despachos', label: 'Despachos', icon: Send },
        { id: 'tracking', label: 'Tracking GPS', icon: Navigation },
        { id: 'guias', label: 'Guías de remisión', icon: ScrollText },
      ],
    },
    {
      group: 'Costos',
      icon: Coins,
      items: [
        { id: 'combustible', label: 'Combustible', icon: Fuel },
        { id: 'mantenimiento', label: 'Mantenimiento', icon: Wrench },
        { id: 'fletes', label: 'Liquidación de fletes', icon: Coins },
        { id: 'reportes', label: 'Reportes', icon: BarChart3 },
      ],
    },
  ],

  DMS: [
    {
      group: 'General',
      icon: Gauge,
      items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }],
    },
    {
      group: 'Reparto',
      icon: Truck,
      items: [
        { id: 'hoja-ruta', label: 'Hoja de ruta', icon: ListChecks },
        { id: 'entregas', label: 'Entregas', icon: PackageCheck },
        { id: 'devoluciones', label: 'Devoluciones', icon: Undo2 },
        { id: 'rechazos', label: 'Rechazos', icon: XCircle },
        { id: 'recojos', label: 'Recojos', icon: Recycle },
      ],
    },
    {
      group: 'Cierre',
      icon: CheckCheck,
      items: [
        { id: 'liquidacion', label: 'Liquidación', icon: Coins },
        { id: 'reportes', label: 'Reportes', icon: BarChart3 },
      ],
    },
  ],

  RRHH: [
    {
      group: 'General',
      icon: Gauge,
      items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }],
    },
    {
      group: 'Personal',
      icon: Users,
      items: [
        { id: 'empleados', label: 'Empleados', icon: UserRound },
        { id: 'contratos', label: 'Contratos', icon: FileSignature },
        { id: 'organigrama', label: 'Organigrama', icon: Network },
      ],
    },
    {
      group: 'Tiempo',
      icon: Clock,
      items: [
        { id: 'asistencia', label: 'Asistencia', icon: Fingerprint },
        { id: 'marcaciones', label: 'Marcaciones', icon: Clock },
        { id: 'horarios', label: 'Horarios', icon: CalendarClock },
        { id: 'turnos', label: 'Turnos', icon: CalendarRange },
        { id: 'vacaciones', label: 'Vacaciones', icon: Palmtree },
        { id: 'permisos', label: 'Permisos', icon: MailQuestion },
        { id: 'licencias', label: 'Licencias', icon: HeartPulse },
      ],
    },
    {
      group: 'Remuneraciones',
      icon: Wallet,
      items: [
        { id: 'nomina', label: 'Nómina', icon: Wallet },
        { id: 'boletas', label: 'Boletas', icon: FileBadge },
        { id: 'adelantos', label: 'Adelantos', icon: Coins },
        { id: 'descuentos', label: 'Descuentos', icon: TrendingDown },
        { id: 'beneficios', label: 'Beneficios', icon: Gift },
      ],
    },
    {
      group: 'Desarrollo',
      icon: GraduationCap,
      items: [
        { id: 'evaluacion', label: 'Evaluación', icon: Star },
        { id: 'capacitacion', label: 'Capacitación', icon: GraduationCap },
        { id: 'reportes', label: 'Reportes', icon: BarChart3 },
      ],
    },
  ],

  CONFIG: [
    {
      group: 'General',
      icon: Gauge,
      items: [{ id: 'usuarios', label: 'Usuarios', icon: Users }],
    },
  ],
};

export const getModules = (systemId) => modulesBySystem[systemId] ?? [];

export const countModules = (systemId) =>
  getModules(systemId).reduce((total, group) => total + group.items.length, 0);

export const findModule = (systemId, moduleId) =>
  getModules(systemId)
    .flatMap((g) => g.items)
    .find((m) => m.id === moduleId);

import { useState, useEffect, useRef } from 'react';
import { Database, Warehouse, Truck, PackageCheck, BriefcaseBusiness } from 'lucide-react';
import ERPPreview from './modules/ERPPreview';
import WMSPreview from './modules/WMSPreview';
import TMSPreview from './modules/TMSPreview';
import DMSPreview from './modules/DMSPreview';
import HRISPreview from './modules/HRISPreview';

const SLIDE_MS = 6000;

const modules = [
  {
    id: 'erp',
    label: 'ERP',
    accent: 'emerald',
    icon: Database,
    title: 'Qué pedidos y ventas existen',
    text: 'Finanzas, compras, inventario y ventas sobre la misma información. Aquí nace el pedido que recorre toda la operación.',
    chip: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    bar: 'bg-emerald-400',
    Preview: ERPPreview,
  },
  {
    id: 'wms',
    label: 'WMS',
    accent: 'sky',
    icon: Warehouse,
    title: 'Qué mercadería preparar y cargar',
    text: 'Ubicaciones, picking por olas y trazabilidad completa. El almacén sabe qué sale antes de que llegue el camión.',
    chip: 'bg-sky-500/10 text-sky-300 border-sky-500/25',
    bar: 'bg-sky-400',
    Preview: WMSPreview,
  },
  {
    id: 'tms',
    label: 'TMS',
    accent: 'violet',
    icon: Truck,
    title: 'Qué vehículo, conductor y ruta',
    text: 'Planifica despachos, asigna unidad y chofer, y sigue cada ruta por GPS desde el mismo panel.',
    chip: 'bg-violet-500/10 text-violet-300 border-violet-500/25',
    bar: 'bg-violet-400',
    Preview: TMSPreview,
  },
  {
    id: 'dms',
    label: 'DMS',
    accent: 'rose',
    icon: PackageCheck,
    title: 'Qué pasó realmente en cada cliente',
    text: 'Entrega, devolución, rechazo y recojo confirmados en campo. La liquidación del repartidor vuelve al almacén y a contabilidad.',
    chip: 'bg-rose-500/10 text-rose-300 border-rose-500/25',
    bar: 'bg-rose-400',
    Preview: DMSPreview,
  },
  {
    id: 'hris',
    label: 'RRHH',
    accent: 'amber',
    icon: BriefcaseBusiness,
    title: 'Tu gente, del ingreso a la nómina',
    text: 'Empleados, asistencia, vacaciones, nómina y desempeño. Un solo lugar para todo el equipo.',
    chip: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    bar: 'bg-amber-400',
    Preview: HRISPreview,
  },
];

export default function ModuleCarousel({ onActiveChange }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const elapsed = useRef(0);

  useEffect(() => {
    elapsed.current = 0;
    setProgress(0);
    onActiveChange?.(modules[active]);
  }, [active, onActiveChange]);

  useEffect(() => {
    if (paused) return;
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      elapsed.current += now - last;
      last = now;
      const pct = Math.min(100, (elapsed.current / SLIDE_MS) * 100);
      setProgress(pct);
      if (pct >= 100) setActive((a) => (a + 1) % modules.length);
    }, 40);
    return () => clearInterval(id);
  }, [active, paused]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* selector de módulos */}
      <div className="mb-9 flex gap-1.5" role="tablist" aria-label="Módulos del sistema">
        {modules.map((m, i) => {
          const Icon = m.icon;
          const isActive = i === active;
          return (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${m.id}`}
              onClick={() => setActive(i)}
              className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border px-1 py-2 text-[11px] font-semibold tracking-wide transition-all duration-300 ${
                isActive
                  ? m.chip
                  : 'border-zinc-800/80 text-zinc-600 hover:border-zinc-700 hover:text-zinc-400'
              }`}
            >
              <Icon size={13} className="shrink-0" aria-hidden="true" />
              {m.label}
            </button>
          );
        })}
      </div>

      {/* contenido del módulo activo */}
      <div className="relative min-h-[22rem]">
        {modules.map((m, i) => {
          const Preview = m.Preview;
          const isActive = i === active;
          return (
            <div
              key={m.id}
              id={`panel-${m.id}`}
              role="tabpanel"
              aria-hidden={!isActive}
              className={`absolute inset-x-0 top-0 transition-all duration-700 ease-out ${
                isActive
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-4 opacity-0'
              }`}
            >
              <h2 className="text-pretty text-[27px] font-semibold leading-[1.15] tracking-tight text-zinc-50">
                {m.title}
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">{m.text}</p>
              <div className="mt-7">
                <Preview />
              </div>
            </div>
          );
        })}
      </div>

      {/* barras de progreso */}
      <div className="mt-9 flex gap-2">
        {modules.map((m, i) => (
          <div key={m.id} className="h-0.5 flex-1 overflow-hidden rounded-full bg-zinc-800">
            <div
              className={`h-full rounded-full ${m.bar}`}
              style={{
                width: i === active ? `${progress}%` : i < active ? '100%' : '0%',
                opacity: i === active ? 1 : 0.35,
              }}
            />
          </div>
        ))}
      </div>

      <p className="mt-5 text-[11px] leading-relaxed text-zinc-600">
        Cinco módulos, una sola base de datos. El pedido nace en ERP, el almacén lo prepara,
        transporte lo lleva, DMS confirma qué pasó en el cliente y todo vuelve a inventario y caja.
      </p>
    </div>
  );
}

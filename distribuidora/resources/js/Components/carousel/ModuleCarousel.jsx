import { useState, useEffect, useRef } from 'react';
import { Database, Warehouse, Truck, BriefcaseBusiness } from 'lucide-react';
import ERPPreview from './modules/ERPPreview';
import WMSPreview from './modules/WMSPreview';
import TMSPreview from './modules/TMSPreview';
import HRISPreview from './modules/HRISPreview';

const SLIDE_MS = 6000;

const modules = [
  {
    id: 'erp',
    label: 'ERP',
    accent: 'emerald',
    icon: Database,
    title: 'Todo el negocio en un tablero',
    text: 'Finanzas, compras, inventario y ventas con la misma información, sin cuadrar hojas de cálculo.',
    chip: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    bar: 'bg-emerald-400',
    Preview: ERPPreview,
  },
  {
    id: 'wms',
    label: 'WMS',
    accent: 'sky',
    icon: Warehouse,
    title: 'Almacén bajo control',
    text: 'Ubicaciones, picking por olas y trazabilidad completa en tiempo real.',
    chip: 'bg-sky-500/10 text-sky-300 border-sky-500/25',
    bar: 'bg-sky-400',
    Preview: WMSPreview,
  },
  {
    id: 'tms',
    label: 'TMS',
    accent: 'violet',
    icon: Truck,
    title: 'Rutas y entregas al día',
    text: 'Planifica despachos, sigue cada unidad por GPS y confirma entregas desde el mismo panel.',
    chip: 'bg-violet-500/10 text-violet-300 border-violet-500/25',
    bar: 'bg-violet-400',
    Preview: TMSPreview,
  },
  {
    id: 'hris',
    label: 'RRHH',
    accent: 'teal',
    icon: BriefcaseBusiness,
    title: 'Tu gente, del ingreso a la nómina',
    text: 'Empleados, asistencia, vacaciones, nómina y desempeño. Un solo lugar para todo el equipo.',
    chip: 'bg-teal-500/10 text-teal-300 border-teal-500/25',
    bar: 'bg-teal-400',
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
        Cuatro módulos, una sola base de datos. Lo que se vende lo descuenta el almacén, lo despacha
        transporte, lo registra contabilidad y lo ejecuta tu equipo.
      </p>
    </div>
  );
}

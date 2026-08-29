import { useState, useEffect, useRef } from 'react';
import { systems as allSystems } from '@/data/systems';
import SystemThemeProvider from '@/Components/systems/SystemThemeProvider';
import SysProgressBar from '@/Components/sys/SysProgressBar';
import ERPPreview from './modules/ERPPreview';
import WMSPreview from './modules/WMSPreview';
import TMSPreview from './modules/TMSPreview';
import DMSPreview from './modules/DMSPreview';
import HRISPreview from './modules/HRISPreview';

const SLIDE_MS = 6000;

// El carrusel muestra solo los sistemas de negocio, no los internos.
const systems = allSystems.filter((s) => !s.internal);

// Lo único que el carrusel añade a `systems`: qué maqueta ilustra cada uno.
const previews = {
  ERP: ERPPreview,
  WMS: WMSPreview,
  TMS: TMSPreview,
  DMS: DMSPreview,
  RRHH: HRISPreview,
};

export default function ModuleCarousel({ onActiveChange }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const elapsed = useRef(0);

  useEffect(() => {
    elapsed.current = 0;
    setProgress(0);
    onActiveChange?.(systems[active]);
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
      if (pct >= 100) setActive((a) => (a + 1) % systems.length);
    }, 40);
    return () => clearInterval(id);
  }, [active, paused]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* selector de sistemas */}
      <div className="mb-9 flex gap-1.5" role="tablist" aria-label="Sistemas de la suite">
        {systems.map((sys, i) => {
          const Icon = sys.icon;
          const isActive = i === active;
          return (
            <SystemThemeProvider key={sys.id} system={sys} className="flex-1">
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${sys.id}`}
                onClick={() => setActive(i)}
                className={`flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border px-1 py-2 text-[11px] font-semibold tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'border-[rgb(var(--sys-rgb)/0.4)] bg-[rgb(var(--sys-rgb)/0.12)] text-[rgb(var(--sys-ink-rgb))]'
                    : 'border-zinc-200 text-zinc-400 hover:border-zinc-300 hover:text-zinc-600'
                }`}
              >
                <Icon size={13} className="shrink-0" aria-hidden="true" />
                {sys.id}
              </button>
            </SystemThemeProvider>
          );
        })}
      </div>

      {/* contenido del sistema activo */}
      <div className="relative min-h-[22rem]">
        {systems.map((sys, i) => {
          const Preview = previews[sys.id];
          const isActive = i === active;
          return (
            <SystemThemeProvider
              key={sys.id}
              system={sys}
              className={`absolute inset-x-0 top-0 transition-all duration-700 ease-out ${
                isActive ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
              }`}
            >
              <div id={`panel-${sys.id}`} role="tabpanel" aria-hidden={!isActive}>
                <h2 className="text-pretty text-[27px] font-semibold leading-[1.15] tracking-tight text-zinc-900">
                  {sys.headline}
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-500">{sys.pitch}</p>
                <div className="mt-7">{Preview && <Preview />}</div>
              </div>
            </SystemThemeProvider>
          );
        })}
      </div>

      {/* barras de progreso */}
      <div className="mt-9 flex gap-2">
        {systems.map((sys, i) => (
          <SystemThemeProvider key={sys.id} system={sys} className="flex-1">
            <SysProgressBar
              value={i === active ? progress : i < active ? 100 : 0}
              className={i === active ? '' : 'opacity-35'}
            />
          </SystemThemeProvider>
        ))}
      </div>

      <p className="mt-5 text-[11px] leading-relaxed text-zinc-400">
        Cinco sistemas, una sola base de datos. El pedido nace en ERP, el almacén lo prepara,
        transporte lo lleva, DMS confirma qué pasó en el cliente y todo vuelve a inventario y caja.
      </p>
    </div>
  );
}

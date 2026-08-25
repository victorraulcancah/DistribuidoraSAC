'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Database, 
  Warehouse, 
  ShoppingCart, 
  Truck,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';
import ERPPreview from './modules/ERPPreview';
import WMSPreview from './modules/WMSPreview';
import POSPreview from './modules/POSPreview';
import TMSPreview from './modules/TMSPreview';

const modules = [
  {
    id: 'erp',
    label: 'ERP',
    icon: Database,
    title: 'Gestión Empresarial',
    text: 'Control total de finanzas, inventario, compras y ventas en una sola plataforma.',
    chip: 'Contabilidad • Inventario • Compras • Ventas',
    dot: 'bg-emerald-500',
    glow: 'bg-emerald-500/20',
    accent: 'emerald',
    Preview: ERPPreview,
  },
  {
    id: 'wms',
    label: 'WMS',
    icon: Warehouse,
    title: 'Almacén Inteligente',
    text: 'Optimización de espacio, picking por olas y trazabilidad completa en tiempo real.',
    chip: 'Ubicaciones • Picking • Packing • Cross-dock',
    dot: 'bg-sky-500',
    glow: 'bg-sky-500/20',
    accent: 'sky',
    Preview: WMSPreview,
  },
  {
    id: 'pos',
    label: 'POS',
    icon: ShoppingCart,
    title: 'Punto de Venta',
    text: 'Ventas rápidas, múltiples pagos, emisión electrónica y fidelización integrada.',
    chip: 'Venta táctil • Pagos mixtos • Sunat • Loyalty',
    dot: 'bg-amber-500',
    glow: 'bg-amber-500/20',
    accent: 'amber',
    Preview: POSPreview,
  },
  {
    id: 'tms',
    label: 'TMS',
    icon: Truck,
    title: 'Transporte & Logística',
    text: 'Planificación de rutas, tracking GPS, prueba de entrega y liquidación de fletes.',
    chip: 'Ruteo • GPS • POD • Liquidación',
    dot: 'bg-violet-500',
    glow: 'bg-violet-500/20',
    accent: 'violet',
    Preview: TMSPreview,
  },
];

const accentColors = {
  emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  sky: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  violet: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
};

const glowColors = {
  emerald: 'bg-emerald-500/30',
  sky: 'bg-sky-500/30',
  amber: 'bg-amber-500/30',
  violet: 'bg-violet-500/30',
};

export default function ModuleCarousel({ className, onActiveChange }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  
  const lastTimeRef = useRef(performance.now());
  const accumulatedRef = useRef(0);
  const animationFrameRef = useRef(null);
  const intervalRef = useRef(null);
  const isHoveringRef = useRef(false);

  const CYCLE_DURATION = 6000;
  const TICK_INTERVAL = 40;

  const nextModule = useCallback(() => {
    setActive((prev) => (prev + 1) % modules.length);
    setProgress(0);
    accumulatedRef.current = 0;
  }, []);

  const goToModule = useCallback((index) => {
    setActive(index);
    setProgress(0);
    accumulatedRef.current = 0;
  }, []);

  const tick = useCallback(() => {
    if (paused || isHoveringRef.current) return;
    
    const now = performance.now();
    const delta = now - lastTimeRef.current;
    lastTimeRef.current = now;
    
    accumulatedRef.current += delta;
    const newProgress = (accumulatedRef.current / CYCLE_DURATION) * 100;
    
    if (newProgress >= 100) {
      nextModule();
    } else {
      setProgress(newProgress);
    }
  }, [paused, nextModule]);

  useEffect(() => {
    lastTimeRef.current = performance.now();
    accumulatedRef.current = 0;
    
    intervalRef.current = setInterval(tick, TICK_INTERVAL);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [tick]);

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    setPaused(true);
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    setPaused(false);
    lastTimeRef.current = performance.now();
  };

  useEffect(() => {
    if (onActiveChange) {
      onActiveChange(modules[active]);
    }
  }, [active, onActiveChange]);

  const currentModule = modules[active];

  return (
    <div 
      className={`relative h-full min-h-[500px] flex flex-col ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Módulos del sistema">
        {modules.map((module, index) => (
          <button
            key={module.id}
            role="tab"
            aria-selected={index === active}
            aria-controls={`panel-${module.id}`}
            id={`tab-${module.id}`}
            onClick={() => goToModule(index)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${index === active 
                ? `${accentColors[module.accent]} border shadow-[0_0_12px_${module.accent === 'emerald' ? 'rgba(16,185,129,0.3)' : module.accent === 'sky' ? 'rgba(14,165,233,0.3)' : module.accent === 'amber' ? 'rgba(245,158,11,0.3)' : 'rgba(168,85,247,0.3)'}]`
                : 'text-zinc-500 hover:text-zinc-200 bg-zinc-800/50 border-zinc-700'
              }
            `}
          >
            <module.icon className="w-4 h-4" aria-hidden="true" />
            <span>{module.label}</span>
            {index === active && (
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" aria-hidden="true" />
            )}
          </button>
        ))}
      </div>

      <div className="relative flex-1 overflow-hidden" role="tabpanel" id={`panel-${currentModule.id}`} aria-labelledby={`tab-${currentModule.id}`}>
        {modules.map((module, index) => (
          <div
            key={module.id}
            className={`
              absolute inset-x-0 top-0 transition-all duration-700 ease-out
              ${index === active 
                ? 'opacity-100 translate-y-0 z-10' 
                : 'opacity-0 translate-y-4 pointer-events-none z-0'
              }
            `}
            style={{ minHeight: '400px' }}
          >
            <module.Preview />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-6" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Progreso del carrusel">
        {modules.map((module, index) => (
          <div key={module.id} className="flex-1 h-0.5 rounded-full overflow-hidden relative bg-zinc-800">
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${index < active ? 100 : index === active ? progress : 0}%`,
                backgroundColor: `var(--color-${module.accent}-500)`,
                opacity: index === active ? 1 : index < active ? 0.8 : 0.3,
              }}
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <button
          onClick={() => {
            const prevIndex = active === 0 ? modules.length - 1 : active - 1;
            goToModule(prevIndex);
          }}
          className="p-2 bg-zinc-900/80 border border-zinc-700 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          aria-label="Módulo anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setPaused(!paused)}
          className="p-2 bg-zinc-900/80 border border-zinc-700 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          aria-label={paused ? 'Reanudar' : 'Pausar'}
        >
          {paused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </button>
        <button
          onClick={() => nextModule()}
          className="p-2 bg-zinc-900/80 border border-zinc-700 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          aria-label="Módulo siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <style jsx global>{`
        :root {
          --color-emerald-500: #10b981;
          --color-sky-500: #0ea5e9;
          --color-amber-500: #f59e0b;
          --color-violet-500: #a855f7;
        }
      `}</style>
    </div>
  );
}
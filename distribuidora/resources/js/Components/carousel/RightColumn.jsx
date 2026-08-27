import { useState } from 'react';
import { systems } from '@/data/systems';
import { systemTheme } from '@/lib/systemTheme';
import ModuleCarousel from './ModuleCarousel';

export default function RightColumn() {
  const [system, setSystem] = useState(systems[0]);

  return (
    <div
      style={systemTheme(system.color)}
      className="relative hidden overflow-hidden border-l border-zinc-200 bg-white lg:flex lg:w-[54%] lg:items-center lg:justify-center"
    >
      {/* cuadrícula técnica negra, se desvanece hacia los bordes */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(0 0 0) 1px, transparent 1px), linear-gradient(to bottom, rgb(0 0 0) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 45%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 45%, black 30%, transparent 75%)',
        }}
      />

      {/* resplandor que cambia con el módulo activo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-[rgb(var(--sys-rgb)/0.1)] blur-3xl transition-colors duration-1000"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-zinc-900/[0.04] blur-3xl"
      />

      <div className="relative z-10 w-full max-w-lg px-10">
        <ModuleCarousel onActiveChange={setSystem} />
      </div>
    </div>
  );
}

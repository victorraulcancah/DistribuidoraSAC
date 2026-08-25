import { useState } from 'react';
import ModuleCarousel from './ModuleCarousel';

const glowByAccent = {
  emerald: 'bg-emerald-500/15',
  sky: 'bg-sky-500/15',
  violet: 'bg-violet-500/15',
  teal: 'bg-teal-500/15',
};

export default function RightColumn() {
  const [accent, setAccent] = useState('emerald');

  return (
    <div className="relative hidden overflow-hidden border-l border-zinc-900 bg-zinc-950 lg:flex lg:w-[54%] lg:items-center lg:justify-center">
      {/* rejilla técnica de fondo */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(39 39 42) 1px, transparent 1px), linear-gradient(to bottom, rgb(39 39 42) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 45%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 45%, black 30%, transparent 75%)',
        }}
      />

      {/* resplandor que cambia con el módulo activo */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full blur-3xl transition-colors duration-1000 ${glowByAccent[accent]}`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-zinc-100/[0.03] blur-3xl"
      />

      <div className="relative z-10 w-full max-w-lg px-10">
        <ModuleCarousel onActiveChange={(module) => setAccent(module.accent)} />
      </div>
    </div>
  );
}

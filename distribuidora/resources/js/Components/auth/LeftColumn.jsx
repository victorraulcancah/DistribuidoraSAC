import { Boxes } from 'lucide-react';
import LoginForm from './LoginForm';

export default function LeftColumn({ onLogin }) {
  return (
    <div className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-white p-6 sm:p-10 lg:w-[46%]">
      {/* trama de puntos muy tenue, se desvanece hacia el centro */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgb(212 212 216) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          opacity: 0.5,
          maskImage: 'radial-gradient(ellipse 70% 55% at 50% 45%, transparent 40%, black 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 55% at 50% 45%, transparent 40%, black 100%)',
        }}
      />

      <header className="relative flex shrink-0 items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-600/25">
          <Boxes size={17} className="text-white" />
        </div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">Suite operativa</p>
      </header>

      <main className="relative flex flex-1 items-center justify-center py-10">
        <div className="w-full max-w-[23rem] rounded-2xl bg-white p-7 ring-1 ring-zinc-200/80 shadow-xl shadow-zinc-900/[0.07]">
          <LoginForm onLogin={onLogin} />
        </div>
      </main>

      <footer className="relative flex shrink-0 items-center justify-between text-[11px] text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Servidor operativo
        </span>
        <span>v1.0 · Conexión cifrada</span>
      </footer>
    </div>
  );
}

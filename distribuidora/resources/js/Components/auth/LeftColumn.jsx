import { Boxes } from 'lucide-react';
import LoginForm from './LoginForm';

export default function LeftColumn() {
  return (
    <div className="relative flex w-full flex-col justify-between bg-white p-6 sm:p-10 lg:w-[46%]">
      {/* resplandor muy sutil detrás del formulario */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-emerald-500/[0.06] blur-3xl" />

      <header className="relative flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 shadow-lg shadow-zinc-900/15">
          <Boxes size={17} className="text-white" />
        </div>
        <div className="leading-tight">
          <p className="text-[15px] font-semibold tracking-tight text-zinc-900">Distribuidora SAC</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">Suite operativa</p>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-sm py-10">
        <LoginForm />
      </main>

      <footer className="relative flex items-center justify-between text-[11px] text-zinc-400">
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

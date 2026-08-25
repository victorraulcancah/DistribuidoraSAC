import { Boxes } from 'lucide-react';
import LoginForm from './LoginForm';

export default function LeftColumn() {
  return (
    <div className="relative flex min-h-dvh w-full flex-col bg-white p-6 sm:p-10 lg:w-[46%]">
      {/* resplandor azul muy sutil detrás del formulario */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[26rem] w-[26rem] rounded-full bg-blue-500/[0.07] blur-3xl" />

      <header className="relative flex shrink-0 items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-600/25">
          <Boxes size={17} className="text-white" />
        </div>
        <div className="leading-tight">
          <p className="text-[15px] font-semibold tracking-tight text-zinc-900">Distribuidora SAC</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-blue-600/70">Suite operativa</p>
        </div>
      </header>

      <main className="relative flex flex-1 items-center justify-center py-10">
        <div className="w-full max-w-sm">
          <LoginForm />
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

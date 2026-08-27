import { Boxes, ArrowRight } from 'lucide-react';
import { systems } from '@/data/systems';

export default function SystemsHome({ user, onEnter }) {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-white p-8 font-sans antialiased">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl shadow-blue-600/25">
            <Boxes size={30} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold uppercase tracking-tight text-zinc-900">
            Distribuidora
          </h1>
          <p className="mt-1.5 text-sm text-zinc-500">
            Suite operativa para tu negocio
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-zinc-500">
            Bienvenido, {user?.name ?? 'usuario'}. Cinco sistemas integrados con
            una sola base de datos. Elige uno para empezar a trabajar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {systems.map((sys) => (
            <SystemCard key={sys.id} sys={sys} onEnter={onEnter} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SystemCard({ sys, onEnter }) {
  const Icon = sys.icon;
  return (
    <button
      type="button"
      onClick={() => onEnter(sys.id)}
      className={`group flex flex-col items-start gap-4 rounded-2xl p-5 text-left shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg ${sys.card}`}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${sys.iconBox}`}>
            <Icon size={22} />
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight text-white">{sys.id}</p>
            <p className="text-xs text-white/70">{sys.full}</p>
          </div>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-white/80">{sys.description}</p>
      <div className="flex w-full items-center justify-between gap-2">
        <span className={`rounded-md border px-2 py-1 text-[10px] font-semibold tracking-wide ${sys.badge}`}>
          {sys.modules} módulos
        </span>
        <span className="flex items-center gap-1 text-xs font-medium text-white/70 transition-colors group-hover:text-white">
          Entrar
          <ArrowRight size={13} />
        </span>
      </div>
    </button>
  );
}

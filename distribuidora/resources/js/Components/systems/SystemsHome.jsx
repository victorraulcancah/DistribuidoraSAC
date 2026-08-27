import { Boxes, ArrowRight } from 'lucide-react';
import { systems } from '@/data/systems';
import UserMenu from './UserMenu';

export default function SystemsHome({ user, onEnter, onLogout }) {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-white p-8 font-sans antialiased">
      <header className="flex shrink-0 justify-end">
        <UserMenu user={user} onLogout={onLogout} />
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center py-8">
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

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {systems.slice(0, 3).map((sys) => (
            <SystemCard key={sys.id} sys={sys} onEnter={onEnter} />
          ))}
          <div className="mt-3 grid grid-cols-1 gap-3 sm:col-span-2 sm:grid-cols-2 lg:col-span-3 lg:mx-auto lg:w-2/3">
            {systems.slice(3).map((sys) => (
              <SystemCard key={sys.id} sys={sys} onEnter={onEnter} />
            ))}
          </div>
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
      className={`group flex items-center gap-4 rounded-2xl p-3.5 text-left shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg ${sys.card}`}
    >
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${sys.iconBox}`}>
        <Icon size={22} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-base font-bold tracking-tight text-white">{sys.id}</p>
          <span className={`truncate rounded-md border px-1.5 py-0.5 text-[10px] font-semibold tracking-wide ${sys.badge}`}>
            {sys.modules} módulos
          </span>
        </div>
        <p className="truncate text-xs text-white/70">{sys.full}</p>
        <p className="mt-0.5 truncate text-xs text-white/60">{sys.description}</p>
      </div>
      <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-white/70 transition-colors group-hover:text-white">
        Entrar
        <ArrowRight size={13} />
      </span>
    </button>
  );
}

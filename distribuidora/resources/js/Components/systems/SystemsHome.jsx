import { Boxes, ArrowRight } from 'lucide-react';
import { systems } from '@/data/systems';
import UserMenu from './UserMenu';
import NotificationsMenu from './NotificationsMenu';
import SystemThemeProvider from './SystemThemeProvider';
import SysBadge from '@/Components/sys/SysBadge';
import { SysSurface, SysIconBox } from '@/Components/sys/SysSurface';

export default function SystemsHome({ user, onEnter, onLogout }) {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-white p-8 font-sans antialiased">
      <header className="flex shrink-0 items-center justify-end gap-2.5">
        <UserMenu user={user} onLogout={onLogout} />
        <NotificationsMenu />
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center py-8">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl shadow-blue-600/25">
            <Boxes size={30} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold uppercase tracking-tight text-zinc-900">
            Distribuidora
          </h1>
          <p className="mt-1.5 text-sm text-zinc-500">Suite operativa para tu negocio</p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-zinc-500">
            Bienvenido, {user?.name ?? 'usuario'}. Cinco sistemas integrados con una sola base de
            datos. Elige uno para empezar a trabajar.
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
    <SystemThemeProvider system={sys}>
      <SysSurface
        as="button"
        type="button"
        onClick={() => onEnter(sys.id)}
        className="group flex w-full flex-col gap-4 rounded-2xl p-4 text-left shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
      >
        <div className="flex items-start gap-3.5">
          <SysIconBox>
            <Icon size={22} />
          </SysIconBox>
          <div className="min-w-0 flex-1">
            <p className="text-base font-bold tracking-tight">{sys.id}</p>
            <p className="truncate text-xs opacity-70">{sys.full}</p>
            <p className="mt-0.5 truncate text-xs opacity-60">{sys.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <SysBadge tone="onColor">{sys.modules} módulos</SysBadge>
          <span className="flex shrink-0 items-center gap-1 text-xs font-medium opacity-70 transition-opacity group-hover:opacity-100">
            Entrar
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </SysSurface>
    </SystemThemeProvider>
  );
}

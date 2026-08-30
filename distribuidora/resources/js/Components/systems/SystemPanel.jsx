import { useState } from 'react';
import { Menu } from 'lucide-react';
import { getSystem } from '@/data/systems';
import { findModule } from '@/data/modules';
import SystemThemeProvider from './SystemThemeProvider';
import UserMenu from './UserMenu';
import NotificationsMenu from './NotificationsMenu';
import SystemSwitcher from './SystemSwitcher';
import SysSidebar from '@/Components/sys/SysSidebar';
import SysBadge from '@/Components/sys/SysBadge';
import { SysEmptyState } from '@/Components/sys/SysFeedback';
import Clientes from '@/Pages/ERP/Clientes';
import Proveedores from '@/Pages/ERP/Proveedores';

/**
 * Pantallas ya construidas, por `SISTEMA:modulo`. Lo que no esté aquí
 * todavía muestra el estado "en construcción".
 */
const screens = {
  'ERP:clientes-y-proveedores.clientes': Clientes,
  'ERP:clientes-y-proveedores.proveedores': Proveedores,
};

export default function SystemPanel({
  systemId,
  activeModule,
  onSelectModule,
  user,
  onExit,
  onLogout,
  onSwitchSystem,
}) {
  const system = getSystem(systemId);
  const [menuOpen, setMenuOpen] = useState(false);
  const current = findModule(systemId, activeModule);
  const ModuleIcon = current?.icon;
  const Screen = screens[`${systemId}:${activeModule}`];

  return (
    <SystemThemeProvider
      system={system}
      className="flex min-h-dvh w-full bg-zinc-50/60 font-sans antialiased"
    >
      <SysSidebar
        activeModule={activeModule}
        onSelect={onSelectModule}
        mobileOpen={menuOpen}
        onCloseMobile={() => setMenuOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-zinc-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              className="-ml-1 shrink-0 rounded-lg p-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 lg:hidden"
            >
              <Menu size={18} />
            </button>
            {ModuleIcon && (
              <ModuleIcon size={18} className="shrink-0 text-[rgb(var(--sys-rgb))]" />
            )}
            <h1 className="truncate text-sm font-semibold text-zinc-900">{current?.label}</h1>
            <SysBadge className="hidden sm:inline-flex">{system?.label ?? system?.id}</SysBadge>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <SystemSwitcher currentId={systemId} onSelect={onSwitchSystem} onExit={onExit} />
            <UserMenu user={user} onLogout={onLogout} />
            <NotificationsMenu />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {Screen ? (
            <Screen />
          ) : (
            <div className="rounded-xl border border-zinc-200 bg-white">
              <SysEmptyState
                icon={ModuleIcon}
                title={`${current?.label} en construcción`}
                description={`Este módulo de ${system?.full} todavía no tiene contenido.`}
              />
            </div>
          )}
        </main>
      </div>
    </SystemThemeProvider>
  );
}

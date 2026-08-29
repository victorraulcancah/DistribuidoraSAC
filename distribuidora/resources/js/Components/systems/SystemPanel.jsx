import { useState } from 'react';
import { Menu, Pencil, Trash2, UserRound } from 'lucide-react';
import { getSystem } from '@/data/systems';
import { findModule } from '@/data/modules';
import SystemThemeProvider from './SystemThemeProvider';
import UserMenu from './UserMenu';
import NotificationsMenu from './NotificationsMenu';
import SystemSwitcher from './SystemSwitcher';
import SysSidebar from '@/Components/sys/SysSidebar';
import SysBadge from '@/Components/sys/SysBadge';
import SysDataTable from '@/Components/sys/SysDataTable';
import { SysEmptyState } from '@/Components/sys/SysFeedback';
import { demoClientes } from '@/data/demoRows';

// Columnas de muestra para el listado de clientes de ERP.
const clientesColumns = [
  { key: 'codigo', label: 'Código' },
  { key: 'nombre', label: 'Cliente' },
  { key: 'ruc', label: 'RUC' },
  { key: 'distrito', label: 'Distrito' },
  { key: 'vendedor', label: 'Vendedor' },
  {
    key: 'deuda',
    label: 'Deuda',
    align: 'right',
    render: (row) => `S/ ${row.deuda.toFixed(2)}`,
  },
  {
    key: 'estado',
    label: 'Estado',
    render: (row) => (
      <span
        className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
          row.estado === 'Activo'
            ? 'bg-emerald-50 text-emerald-700'
            : row.estado === 'Moroso'
              ? 'bg-amber-50 text-amber-700'
              : 'bg-red-50 text-red-700'
        }`}
      >
        {row.estado}
      </span>
    ),
  },
];

export default function SystemPanel({ systemId, user, onExit, onLogout, onSwitchSystem }) {
  const system = getSystem(systemId);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const current = findModule(systemId, activeModule);
  const ModuleIcon = current?.icon;

  return (
    <SystemThemeProvider
      system={system}
      className="flex min-h-dvh w-full bg-zinc-50/60 font-sans antialiased"
    >
      <SysSidebar
        activeModule={activeModule}
        onSelect={setActiveModule}
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
          {activeModule === 'clientes' ? (
            <SysDataTable
              columns={clientesColumns}
              rows={demoClientes}
              searchPlaceholder="Buscar cliente, RUC, distrito..."
              empty="Ningún cliente coincide con la búsqueda."
              cardIcon={UserRound}
              actions={() => (
                <>
                  <button
                    type="button"
                    aria-label="Editar"
                    className="rounded-md p-1 text-[rgb(var(--sys-rgb))] transition-colors hover:bg-[rgb(var(--sys-rgb)/0.12)]"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    aria-label="Eliminar"
                    className="rounded-md p-1 text-red-500 transition-colors hover:bg-red-50"
                  >
                    <Trash2 size={15} />
                  </button>
                </>
              )}
            />
          ) : (
            <div className="rounded-xl border border-zinc-200 bg-white">
              <SysEmptyState
                icon={ModuleIcon}
                title={`${current?.label} en construcción`}
                description={`Este módulo de ${system?.full} todavía no tiene contenido. Los componentes ya heredan el color del sistema, así que al construirlo saldrá con la identidad de ${system?.id}.`}
              />
            </div>
          )}
        </main>
      </div>
    </SystemThemeProvider>
  );
}

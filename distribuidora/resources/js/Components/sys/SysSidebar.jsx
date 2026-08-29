import { useState } from 'react';
import { ChevronDown, ChevronLeft, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSystem } from '@/Components/systems/SystemThemeProvider';
import { getModules } from '@/data/modules';

/**
 * Barra lateral de un sistema. No sabe de colores: toma el del contenedor,
 * así que la misma pieza sirve para los cinco sistemas.
 */
export default function SysSidebar({ activeModule, onSelect, onExit }) {
  const system = useSystem();
  const [collapsed, setCollapsed] = useState(false);
  // Arrancan todos plegados; se guarda solo lo que el usuario abre.
  const [opened, setOpened] = useState({});
  const groups = getModules(system?.id);
  const Icon = system?.icon;

  const toggleGroup = (name) => setOpened((prev) => ({ ...prev, [name]: !prev[name] }));

  return (
    <aside
      className={cn(
        'flex shrink-0 flex-col border-r border-zinc-200 bg-white transition-[width] duration-200',
        collapsed ? 'w-[68px]' : 'w-64',
      )}
    >
      {/* cabecera: única zona con el color pleno del sistema */}
      <div className="flex items-center gap-2.5 bg-gradient-to-br from-[rgb(var(--sys-rgb))] to-[rgb(var(--sys-dark-rgb))] p-3.5 text-[var(--sys-on)]">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[rgb(var(--sys-on-rgb)/0.3)] bg-[rgb(var(--sys-on-rgb)/0.15)]">
          {Icon && <Icon size={18} />}
        </div>
        {!collapsed && (
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-bold tracking-tight">{system?.id}</p>
            <p className="truncate text-[10px] opacity-70">{system?.full}</p>
          </div>
        )}
      </div>

      {/* módulos */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {groups.map((group) => {
          // El grupo que contiene el módulo activo se marca en la cabecera,
          // pero plegado no muestra ningún elemento.
          const hasActive = group.items.some((i) => i.id === activeModule);
          const isOpen = collapsed || !!opened[group.group];
          const GroupIcon = group.icon;
          const visible = isOpen ? group.items : [];

          return (
            <div key={group.group} className="mb-3 last:mb-0">
              {!collapsed && (
                <button
                  type="button"
                  onClick={() => toggleGroup(group.group)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400 transition-colors hover:text-zinc-600"
                >
                  <span className="flex min-w-0 items-center gap-1.5">
                    {GroupIcon && (
                      <GroupIcon
                        size={13}
                        className={cn(
                          'shrink-0 transition-colors',
                          isOpen || hasActive ? 'text-[rgb(var(--sys-rgb))]' : 'text-zinc-400'
                        )}
                      />
                    )}
                    <span className="truncate">{group.group}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    {!isOpen && (
                      <span
                        className={cn(
                          'rounded px-1 text-[9px] font-semibold tabular-nums',
                          hasActive
                            ? 'bg-[rgb(var(--sys-rgb)/0.15)] text-[rgb(var(--sys-ink-rgb))]'
                            : 'bg-zinc-100 text-zinc-500'
                        )}
                      >
                        {group.items.length}
                      </span>
                    )}
                    <ChevronDown
                      size={13}
                      className={cn(
                        'shrink-0 transition-transform duration-200',
                        !isOpen && '-rotate-90',
                      )}
                    />
                  </span>
                </button>
              )}
              <ul className={cn('space-y-0.5', !collapsed && 'mt-0.5')}>
                {visible.map((item) => {
                  const ItemIcon = item.icon;
                  const isActive = item.id === activeModule;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onSelect?.(item.id)}
                        title={collapsed ? item.label : undefined}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'relative flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-[13px] transition-colors',
                          collapsed && 'justify-center',
                          isActive
                            ? 'bg-[rgb(var(--sys-rgb)/0.12)] font-medium text-[rgb(var(--sys-ink-rgb))]'
                            : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900',
                        )}
                      >
                        {isActive && (
                          <span className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-[rgb(var(--sys-rgb))]" />
                        )}
                        <ItemIcon
                          size={16}
                          className={cn(
                            'shrink-0',
                            isActive ? 'text-[rgb(var(--sys-rgb))]' : 'text-zinc-400',
                          )}
                        />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      {/* pie */}
      <div className="space-y-0.5 border-t border-zinc-100 p-2">
        <button
          type="button"
          onClick={onExit}
          title={collapsed ? 'Cambiar de sistema' : undefined}
          className={cn(
            'flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-[13px] text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900',
            collapsed && 'justify-center',
          )}
        >
          <ChevronLeft size={16} className="shrink-0 text-zinc-400" />
          {!collapsed && <span className="truncate">Cambiar de sistema</span>}
        </button>

        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? 'Expandir menú' : 'Contraer menú'}
          className={cn(
            'flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-[13px] text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-900',
            collapsed && 'justify-center',
          )}
        >
          {collapsed ? (
            <PanelLeftOpen size={16} className="shrink-0 text-zinc-400" />
          ) : (
            <PanelLeftClose size={16} className="shrink-0 text-zinc-400" />
          )}
          {!collapsed && <span className="truncate">Contraer</span>}
        </button>
      </div>
    </aside>
  );
}

import { useEffect, useState } from 'react';
import { ChevronDown, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSystem } from '@/Components/systems/SystemThemeProvider';
import { getModules } from '@/data/modules';

/**
 * Barra lateral de un sistema. No sabe de colores: toma el del contenedor,
 * así que la misma pieza sirve para los cinco sistemas.
 */
export default function SysSidebar({ activeModule, onSelect, mobileOpen, onCloseMobile }) {
  const system = useSystem();
  const [collapsed, setCollapsed] = useState(false);
  // Arrancan todos plegados; se guarda solo lo que el usuario abre.
  const [opened, setOpened] = useState({});
  // Con la barra contraída, el grupo pulsado se despliega en un panel flotante.
  const [flyout, setFlyout] = useState(null);
  const groups = getModules(system?.id);
  const Icon = system?.icon;

  const toggleGroup = (name) => setOpened((prev) => ({ ...prev, [name]: !prev[name] }));

  useEffect(() => {
    if (!flyout) return;
    const close = (e) => {
      if (!e.target.closest?.('[data-flyout]')) setFlyout(null);
    };
    const onKey = (e) => e.key === 'Escape' && setFlyout(null);
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [flyout]);

  useEffect(() => {
    if (!collapsed) setFlyout(null);
  }, [collapsed]);

  return (
    <>
      {/* velo del panel deslizante en móvil */}
      <div
        onClick={onCloseMobile}
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-40 bg-zinc-900/40 transition-opacity lg:hidden',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <aside
        className={cn(
          'z-50 flex shrink-0 flex-col border-r border-zinc-200 bg-white transition-transform duration-200',
          // móvil: panel fuera de pantalla que entra al abrirlo
          'fixed inset-y-0 left-0 w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          // escritorio: columna fija que puede contraerse
          'lg:static lg:translate-x-0 lg:transition-[width]',
          collapsed ? 'lg:w-[68px]' : 'lg:w-64',
        )}
      >
        {/* cabecera: única zona con el color pleno del sistema */}
        <div className="flex items-center gap-2.5 bg-gradient-to-br from-[rgb(var(--sys-rgb))] to-[rgb(var(--sys-dark-rgb))] p-3.5 text-[var(--sys-on)]">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[rgb(var(--sys-on-rgb)/0.3)] bg-[rgb(var(--sys-on-rgb)/0.15)]">
            {Icon && <Icon size={18} />}
          </div>
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-bold tracking-tight">{system?.label ?? system?.id}</p>
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
            const GroupIcon = group.icon;
            // Con la barra contraída no cabe ningún módulo: se muestra solo el
            // icono del grupo, y al pulsarlo la barra se expande abriéndolo.
            const isOpen = collapsed ? false : !!opened[group.group];
            const visible = isOpen ? group.items : [];

            if (collapsed) {
              return (
                <button
                  key={group.group}
                  type="button"
                  data-flyout
                  title={group.group}
                  aria-label={group.group}
                  aria-expanded={flyout?.group === group.group}
                  onClick={(e) =>
                    setFlyout((prev) =>
                      prev?.group === group.group
                        ? null
                        : { group: group.group, top: e.currentTarget.getBoundingClientRect().top }
                    )
                  }
                  className={cn(
                    'mb-1 flex w-full items-center justify-center rounded-lg p-2 transition-colors',
                    hasActive || flyout?.group === group.group
                      ? 'bg-[rgb(var(--sys-rgb)/0.12)] text-[rgb(var(--sys-rgb))]'
                      : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-700'
                  )}
                >
                  {GroupIcon && <GroupIcon size={18} />}
                </button>
              );
            }

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
                            isOpen || hasActive ? 'text-[rgb(var(--sys-rgb))]' : 'text-zinc-400',
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
                              : 'bg-zinc-100 text-zinc-500',
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
                          onClick={() => {
                            onSelect?.(item.id);
                            onCloseMobile?.();
                          }}
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

        {/* panel flotante: los módulos del grupo pulsado con la barra contraída */}
        {collapsed && flyout && (
          <div
            data-flyout
            role="menu"
            style={{ top: Math.min(flyout.top, window.innerHeight - 320) }}
            className="fixed left-[68px] z-50 ml-1 max-h-[19rem] w-56 overflow-y-auto rounded-xl bg-white py-1 shadow-xl shadow-zinc-900/15 ring-1 ring-zinc-200"
          >
            <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
              {flyout.group}
            </p>
            <ul className="px-1 pb-1">
              {(groups.find((g) => g.group === flyout.group)?.items ?? []).map((item) => {
                const ItemIcon = item.icon;
                const isActive = item.id === activeModule;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        onSelect?.(item.id);
                        setFlyout(null);
                        onCloseMobile?.();
                      }}
                      className={cn(
                        'flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-[13px] transition-colors',
                        isActive
                          ? 'bg-[rgb(var(--sys-rgb)/0.12)] font-medium text-[rgb(var(--sys-ink-rgb))]'
                          : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                      )}
                    >
                      <ItemIcon
                        size={16}
                        className={cn(
                          'shrink-0',
                          isActive ? 'text-[rgb(var(--sys-rgb))]' : 'text-zinc-400'
                        )}
                      />
                      <span className="truncate">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* pie */}
        <div className="space-y-0.5 border-t border-zinc-100 p-2">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? 'Expandir menú' : 'Contraer menú'}
            className={cn(
              // contraer solo tiene sentido en escritorio: en móvil es un panel deslizante
              'hidden w-full items-center gap-2.5 rounded-lg px-2 py-2 text-[13px] text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-900 lg:flex',
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
    </>
  );
}

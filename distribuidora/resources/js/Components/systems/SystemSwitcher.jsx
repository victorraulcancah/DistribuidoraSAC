import { useEffect, useRef, useState } from 'react';
import { Check, Home, LayoutGrid } from 'lucide-react';
import { systems } from '@/data/systems';
import { countModules } from '@/data/modules';
import { cn } from '@/lib/utils';

/**
 * Cambia de sistema desde la barra superior. Cada opción se pinta con su
 * propio color, tomado de `systems.js`.
 */
export default function SystemSwitcher({ currentId, onSelect, onExit }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const onEscape = (e) => e.key === 'Escape' && setOpen(false);

    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Cambiar de sistema"
        title="Cambiar de sistema"
        className={cn(
          'flex h-[38px] w-[38px] items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800',
          open && 'bg-zinc-100 text-zinc-800'
        )}
      >
        <LayoutGrid size={18} />
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            'z-40 overflow-hidden rounded-xl bg-white shadow-xl shadow-zinc-900/10 ring-1 ring-zinc-200/80',
            // móvil: el botón queda a media barra, así que anclarlo a su derecha
            // lo sacaría de pantalla; se fija al ancho disponible.
            'fixed inset-x-4 top-16',
            'sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-[17rem]'
          )}
        >
          <p className="border-b border-zinc-100 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Sistemas
          </p>

          <ul className="p-1">
            <li>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  onExit?.();
                }}
                className="mb-1 flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors hover:bg-zinc-50"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
                  <Home size={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-semibold text-zinc-900">Inicio</span>
                  <span className="block truncate text-[11px] text-zinc-500">
                    Ver todos los sistemas
                  </span>
                </span>
              </button>
            </li>

            {systems.map((sys) => {
              const Icon = sys.icon;
              const isCurrent = sys.id === currentId;
              return (
                <li key={sys.id}>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setOpen(false);
                      if (!isCurrent) onSelect?.(sys.id);
                    }}
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors',
                      isCurrent ? 'bg-zinc-50' : 'hover:bg-zinc-50'
                    )}
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white"
                      style={{ backgroundColor: sys.color }}
                    >
                      <Icon size={16} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-semibold text-zinc-900">
                        {sys.label ?? sys.id}
                      </span>
                      <span className="block truncate text-[11px] text-zinc-500">
                        {countModules(sys.id)} módulos
                      </span>
                    </span>
                    {isCurrent && (
                      <Check size={15} className="shrink-0" style={{ color: sys.color }} />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

        </div>
      )}
    </div>
  );
}

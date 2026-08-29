import { useEffect, useRef, useState } from 'react';
import { Bell, PackageCheck, AlertTriangle, Truck } from 'lucide-react';

// Datos de muestra: la campana todavía no está conectada a ninguna fuente real.
const notifications = [
  {
    id: 1,
    icon: AlertTriangle,
    tone: 'bg-amber-50 text-amber-600',
    title: 'Stock bajo en 4 productos',
    detail: 'Almacén principal · revisar reposición',
    time: 'Hace 10 min',
    unread: true,
  },
  {
    id: 2,
    icon: Truck,
    tone: 'bg-violet-50 text-violet-600',
    title: 'Ruta 4 inició despacho',
    detail: '12 paradas asignadas a C. Mendoza',
    time: 'Hace 1 h',
    unread: true,
  },
  {
    id: 3,
    icon: PackageCheck,
    tone: 'bg-rose-50 text-rose-600',
    title: 'Devolución registrada',
    detail: 'Minimarket La Rosa · 3 unidades',
    time: 'Ayer',
    unread: false,
  },
];

export default function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const onEscape = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, [open]);

  const unread = notifications.filter((n) => n.unread).length;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={unread ? `Notificaciones, ${unread} sin leer` : 'Notificaciones'}
        className="relative flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white shadow-md shadow-zinc-900/[0.06] ring-1 ring-zinc-200/80 transition hover:ring-zinc-300"
      >
        <Bell size={17} className="text-zinc-500" />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white ring-2 ring-white">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-2 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-xl bg-white shadow-xl shadow-zinc-900/10 ring-1 ring-zinc-200/80"
        >
          <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
            <p className="text-[13px] font-semibold text-zinc-900">Notificaciones</p>
            <button
              type="button"
              className="text-[11px] font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              Marcar todas como leídas
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <button
                  key={n.id}
                  type="button"
                  role="menuitem"
                  className={`flex w-full items-start gap-3 border-b border-zinc-100 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-zinc-50 ${
                    n.unread ? 'bg-blue-50/40' : ''
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${n.tone}`}
                  >
                    <Icon size={14} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium text-zinc-900">
                      {n.title}
                    </span>
                    <span className="block truncate text-[11px] text-zinc-500">{n.detail}</span>
                    <span className="mt-0.5 block text-[10px] text-zinc-400">{n.time}</span>
                  </span>
                  {n.unread && (
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="border-t border-zinc-100 px-4 py-2.5 text-center">
            <button
              type="button"
              className="text-[12px] font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              Ver todas las notificaciones
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

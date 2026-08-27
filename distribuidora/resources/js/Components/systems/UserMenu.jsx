import { useEffect, useRef, useState } from 'react';
import { ChevronDown, LogOut, UserRound } from 'lucide-react';

export default function UserMenu({ user, onLogout }) {
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

  const name = user?.name ?? 'Usuario';

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setOpen(false);
    onLogout?.();
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full bg-white py-2 pl-4 pr-3 text-[13px] shadow-md shadow-zinc-900/[0.06] ring-1 ring-zinc-200/80 transition hover:ring-zinc-300"
      >
        <span className="uppercase tracking-wide text-zinc-500">Hola,</span>
        <span className="max-w-[14rem] truncate font-semibold uppercase tracking-wide text-blue-600">
          {name}
        </span>
        <ChevronDown
          size={15}
          className={`shrink-0 text-zinc-400 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-2 w-64 overflow-hidden rounded-xl bg-white shadow-xl shadow-zinc-900/10 ring-1 ring-zinc-200/80"
        >
          <div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700">
              <span className="text-sm font-semibold text-white">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-zinc-900">{name}</p>
              <p className="truncate text-[11px] text-zinc-500">{user?.email}</p>
            </div>
          </div>

          <button
            type="button"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[13px] text-zinc-600 transition-colors hover:bg-zinc-50"
          >
            <UserRound size={15} className="text-zinc-400" />
            Mi perfil
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 border-t border-zinc-100 px-4 py-2.5 text-left text-[13px] text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut size={15} />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}

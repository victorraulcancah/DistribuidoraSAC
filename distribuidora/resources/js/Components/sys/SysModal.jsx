import { useEffect, useMemo } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSystem } from '@/Components/systems/SystemThemeProvider';
import { systemTheme } from '@/lib/systemTheme';

/**
 * Modal con la identidad del sistema activo. Reutilizable para crear, editar
 * y ver detalles.
 *
 * `size`: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
 * `footer`: región de botones (SysButton, etc.)
 * `onClose`: obligatorio para que funcione Esc, clic fuera y la X.
 */
export default function SysModal({
  show = false,
  onClose,
  title,
  subtitle,
  size = 'md',
  footer,
  children,
  closeable = true,
  className,
}) {
  const close = () => closeable && onClose?.();

  // El Dialog se monta en un portal fuera del árbol del sistema, así que lo
  // re-pinta con las variables del sistema activo para que los componentes
  // hijos (SysButton, SysInput…) recojan el color correcto.
  const system = useSystem();
  const themeStyle = useMemo(
    () => systemTheme(system?.color ?? '#3f3f46', system?.ink),
    [system?.color, system?.ink]
  );

  // Cerrar con Escape sin depender del prop Dialog de headlessui.
  useEffect(() => {
    if (!show || !closeable) return;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [show, closeable, onClose]);

  const sizes = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
    full: 'sm:max-w-full',
  };

  return (
    <Transition show={show} leave="duration-200">
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0"
        onClose={close}
      >
        <TransitionChild
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-950/50 backdrop-blur-[2px]" />
        </TransitionChild>

        <TransitionChild
          enter="ease-out duration-250"
          enterFrom="opacity-0 translate-y-4 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:scale-95"
        >
          <DialogPanel
            style={themeStyle}
            className={cn(
              'relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl',
              'shadow-zinc-950/20 ring-1 ring-zinc-200 transition-transform sm:mx-auto',
              sizes[size],
              className
            )}
          >
            {(title || (closeable && onClose)) && (
              <div className="flex shrink-0 items-start justify-between gap-3 border-b border-zinc-100 px-5 py-4">
                <div className="min-w-0">
                  {title && (
                    <DialogTitle className="truncate text-[15px] font-semibold text-zinc-900">
                      {title}
                    </DialogTitle>
                  )}
                  {subtitle && (
                    <p className="mt-0.5 truncate text-[13px] text-zinc-500">{subtitle}</p>
                  )}
                </div>
                {closeable && onClose && (
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Cerrar"
                    className="-mr-1.5 -mt-1.5 shrink-0 rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>
            )}

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">{children}</div>

            {footer && (
              <div className="flex shrink-0 items-center justify-end gap-2 border-t border-zinc-100 bg-zinc-50/60 px-5 py-3.5">
                {footer}
              </div>
            )}
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}

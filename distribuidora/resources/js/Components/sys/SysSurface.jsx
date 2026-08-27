import { cn } from '@/lib/utils';

/**
 * Superficie coloreada del sistema (la cara de una tarjeta, una cabecera de
 * panel). Al usar `--sys-on` para la tinta, el texto de dentro siempre
 * contrasta sin decidirlo a mano.
 */
export function SysSurface({ as: Tag = 'div', className, children, ...props }) {
  return (
    <Tag
      className={cn(
        'bg-gradient-to-br from-[rgb(var(--sys-rgb))] to-[rgb(var(--sys-dark-rgb))] text-[var(--sys-on)]',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

/** Caja de icono para usar sobre una SysSurface. */
export function SysIconBox({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border',
        'border-[rgb(var(--sys-on-rgb)/0.3)] bg-[rgb(var(--sys-on-rgb)/0.15)] text-[var(--sys-on)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/** Caja de icono para fondo blanco: color pleno sobre un lavado del color. */
export function SysIconTile({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border',
        'border-[rgb(var(--sys-rgb)/0.25)] bg-[rgb(var(--sys-rgb)/0.12)] text-[rgb(var(--sys-ink-rgb))]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

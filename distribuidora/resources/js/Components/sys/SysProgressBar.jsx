import { cn } from '@/lib/utils';

/** Barra de progreso con el color del sistema activo. */
export default function SysProgressBar({ value = 0, className, trackClassName, ...props }) {
  return (
    <div
      className={cn('h-0.5 overflow-hidden rounded-full bg-zinc-200', trackClassName)}
      {...props}
    >
      <div
        className={cn('h-full rounded-full bg-[rgb(var(--sys-rgb))]', className)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

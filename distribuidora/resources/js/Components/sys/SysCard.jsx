import { cn } from '@/lib/utils';

/** Tarjeta neutra de contenido. */
export function SysCard({ className, children, ...props }) {
  return (
    <div
      className={cn('rounded-xl border border-zinc-200 bg-white shadow-sm', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function SysCardHeader({ title, subtitle, action, className, ...props }) {
  return (
    <div
      className={cn('flex items-center justify-between gap-3 border-b border-zinc-100 p-4', className)}
      {...props}
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-zinc-900">{title}</p>
        {subtitle && <p className="truncate text-xs text-zinc-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function SysCardBody({ className, children, ...props }) {
  return (
    <div className={cn('p-4', className)} {...props}>
      {children}
    </div>
  );
}

/** Tarjeta de indicador: el valor va con la tinta del sistema. */
export function SysStatCard({ label, value, hint, icon: Icon, className, ...props }) {
  return (
    <SysCard className={cn('p-4', className)} {...props}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-[10px] uppercase tracking-wider text-zinc-500">{label}</p>
        {Icon && (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--sys-rgb)/0.12)] text-[rgb(var(--sys-ink-rgb))]">
            <Icon size={14} />
          </span>
        )}
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">{value}</p>
      {hint && <p className="mt-0.5 text-[11px] text-zinc-500">{hint}</p>}
    </SysCard>
  );
}

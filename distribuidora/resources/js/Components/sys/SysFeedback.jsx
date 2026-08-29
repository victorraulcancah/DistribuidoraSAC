import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Aviso. Los estados semánticos (error, éxito, advertencia) NO usan el color
 * del sistema a propósito: rojo significa error en los cinco sistemas.
 * Solo `info` toma el color, porque ahí sí es identidad y no significado.
 */
export function SysAlert({ tone = 'info', title, children, className, ...props }) {
  const tones = {
    info: {
      icon: Info,
      className:
        'border-[rgb(var(--sys-rgb)/0.3)] bg-[rgb(var(--sys-rgb)/0.08)] text-[rgb(var(--sys-ink-rgb))]',
    },
    success: { icon: CheckCircle2, className: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
    warning: { icon: TriangleAlert, className: 'border-amber-200 bg-amber-50 text-amber-700' },
    error: { icon: AlertCircle, className: 'border-red-200 bg-red-50 text-red-700' },
  };

  const { icon: Icon, className: toneClass } = tones[tone] ?? tones.info;

  return (
    <div
      role="status"
      className={cn('flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm', toneClass, className)}
      {...props}
    >
      <Icon size={16} className="mt-0.5 shrink-0" />
      <div className="min-w-0">
        {title && <p className="font-medium">{title}</p>}
        {children && <div className={cn(title && 'mt-0.5 opacity-90')}>{children}</div>}
      </div>
    </div>
  );
}

/** Estado vacío para módulos aún sin contenido. */
export function SysEmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div className={cn('flex flex-col items-center px-6 py-16 text-center', className)}>
      {Icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgb(var(--sys-rgb)/0.25)] bg-[rgb(var(--sys-rgb)/0.1)] text-[rgb(var(--sys-ink-rgb))]">
          <Icon size={26} />
        </div>
      )}
      <p className="text-base font-semibold text-zinc-900">{title}</p>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-zinc-500">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

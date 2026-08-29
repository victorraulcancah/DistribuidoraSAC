import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

/** Campo de texto cuyo foco toma el color del sistema. */
export const SysInput = forwardRef(({ className, icon: Icon, error, ...props }, ref) => (
  <div className="relative">
    {Icon && (
      <Icon
        size={15}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
        aria-hidden="true"
      />
    )}
    <input
      ref={ref}
      className={cn(
        'w-full rounded-lg border bg-white py-2.5 pr-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400',
        'focus:ring-2 disabled:bg-zinc-50 disabled:text-zinc-400',
        Icon ? 'pl-9' : 'pl-3',
        error
          ? 'border-red-300 focus:border-red-400 focus:ring-red-500/15'
          : 'border-zinc-200 focus:border-[rgb(var(--sys-rgb)/0.6)] focus:ring-[rgb(var(--sys-rgb)/0.15)]',
        className
      )}
      aria-invalid={error ? 'true' : 'false'}
      {...props}
    />
  </div>
));

SysInput.displayName = 'SysInput';

export const SysSelect = forwardRef(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      'w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition',
      'focus:border-[rgb(var(--sys-rgb)/0.6)] focus:ring-2 focus:ring-[rgb(var(--sys-rgb)/0.15)]',
      className
    )}
    {...props}
  >
    {children}
  </select>
));

SysSelect.displayName = 'SysSelect';

export function SysLabel({ className, children, ...props }) {
  return (
    <label className={cn('block text-[13px] font-medium text-zinc-700', className)} {...props}>
      {children}
    </label>
  );
}

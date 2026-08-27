import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

/** Botón que toma el color del sistema activo. */
const SysButton = forwardRef(
  ({ variant = 'solid', size = 'md', className, children, ...props }, ref) => {
    const variants = {
      solid:
        'bg-[rgb(var(--sys-rgb))] text-[var(--sys-on)] hover:bg-[rgb(var(--sys-dark-rgb))] shadow-sm',
      soft: 'bg-[rgb(var(--sys-rgb)/0.12)] text-[rgb(var(--sys-ink-rgb))] hover:bg-[rgb(var(--sys-rgb)/0.2)]',
      outline:
        'border border-[rgb(var(--sys-rgb)/0.4)] text-[rgb(var(--sys-ink-rgb))] hover:bg-[rgb(var(--sys-rgb)/0.08)]',
      ghost: 'text-[rgb(var(--sys-ink-rgb))] hover:bg-[rgb(var(--sys-rgb)/0.1)]',
    };

    const sizes = {
      sm: 'gap-1.5 px-3 py-1.5 text-xs',
      md: 'gap-2 px-4 py-2.5 text-sm',
      lg: 'gap-2 px-5 py-3 text-sm',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'group inline-flex items-center justify-center rounded-lg font-semibold transition-colors outline-none',
          'focus-visible:ring-2 focus-visible:ring-[rgb(var(--sys-rgb)/0.4)] focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-60',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

SysButton.displayName = 'SysButton';
export default SysButton;

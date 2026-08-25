import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Button = forwardRef(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const base =
      'group inline-flex items-center justify-center font-semibold rounded-lg transition outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-60 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-blue-600 text-white shadow-sm shadow-blue-600/25 hover:bg-blue-700 focus-visible:ring-blue-500/40',
      secondary:
        'border border-dashed border-zinc-300 text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 focus-visible:ring-zinc-300',
      ghost: 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-zinc-300',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400',
    };

    const sizes = {
      sm: 'gap-1.5 px-3 py-1.5 text-xs',
      md: 'gap-2 px-4 py-2.5 text-sm',
      lg: 'gap-2 px-5 py-2.5 text-sm',
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

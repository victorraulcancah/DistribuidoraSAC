import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef(
  ({ className, type = 'text', error, icon: Icon, ...props }, ref) => {
    return (
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full bg-zinc-900/60 border border-zinc-800 text-zinc-100 placeholder-zinc-500',
            'rounded-lg transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            Icon ? 'pl-10' : 'pl-4',
            'pr-4 py-3',
            error && 'border-red-500/50 focus:ring-red-500/20',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${props.id}-error`} className="mt-1.5 text-sm text-red-400 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
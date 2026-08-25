import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef(
  ({ className, type = 'text', error, icon: Icon, ...props }, ref) => (
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
        type={type}
        className={cn(
          'w-full rounded-lg border bg-white py-2.5 pr-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400',
          'focus:ring-2 disabled:bg-zinc-50 disabled:text-zinc-400',
          Icon ? 'pl-9' : 'pl-3',
          error
            ? 'border-red-300 focus:border-red-400 focus:ring-red-500/15'
            : 'border-zinc-200 focus:border-blue-400 focus:ring-blue-500/15',
          className
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      />
    </div>
  )
);

Input.displayName = 'Input';

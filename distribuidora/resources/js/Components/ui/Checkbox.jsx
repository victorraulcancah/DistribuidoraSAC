import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Checkbox = forwardRef(({ className, label, ...props }, ref) => (
  <label className="flex cursor-pointer select-none items-center gap-2 text-xs text-zinc-500">
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        'h-3.5 w-3.5 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900/20',
        className
      )}
      {...props}
    />
    {label}
  </label>
));

Checkbox.displayName = 'Checkbox';

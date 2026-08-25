import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Checkbox = forwardRef(
  ({ className, label, description, ...props }, ref) => {
    return (
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            'mt-0.5 w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-emerald-500',
            'focus:ring-2 focus:ring-emerald-500/20 focus:ring-offset-2 focus:ring-offset-zinc-950',
            'checked:border-emerald-500 hover:border-emerald-500/50',
            'transition-colors duration-200',
            className
          )}
          {...props}
        />
        {(label || description) && (
          <div className="text-sm">
            {label && <span className="text-zinc-100 font-medium">{label}</span>}
            {description && (
              <p className="text-zinc-500 mt-0.5">{description}</p>
            )}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
import { cn } from '@/lib/utils';

export function Label({ className, children, ...props }) {
  return (
    <label
      className={cn(
        'block text-sm font-medium text-zinc-300 mb-1.5',
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}
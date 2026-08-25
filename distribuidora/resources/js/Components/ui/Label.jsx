import { cn } from '@/lib/utils';

export function Label({ className, children, ...props }) {
  return (
    <label className={cn('block text-[13px] font-medium text-zinc-700', className)} {...props}>
      {children}
    </label>
  );
}

import { cn } from '@/lib/utils';

/** Pestañas subrayadas con el color del sistema. `tabs`: [{ id, label, icon }] */
export default function SysTabs({ tabs = [], active, onChange, className }) {
  return (
    <div className={cn('flex gap-1 border-b border-zinc-200', className)} role="tablist">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange?.(tab.id)}
            className={cn(
              'relative flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-medium transition-colors',
              isActive
                ? 'text-[rgb(var(--sys-ink-rgb))]'
                : 'text-zinc-500 hover:text-zinc-800'
            )}
          >
            {Icon && <Icon size={15} className="shrink-0" />}
            {tab.label}
            {isActive && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[rgb(var(--sys-rgb))]" />
            )}
          </button>
        );
      })}
    </div>
  );
}

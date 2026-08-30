import { cn } from '@/lib/utils';

/**
 * Pestañas tipo pill con icono, pintadas con el color del sistema activo.
 * `tabs`: [{ id, label, icon }]
 */
export default function SysTabs({ tabs = [], active, onChange, className }) {
  return (
    <div
      className={cn('flex gap-1.5 rounded-xl bg-zinc-100/80 p-1.5 ring-1 ring-zinc-200/60', className)}
      role="tablist"
    >
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
              'flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-[13px] font-semibold transition-all',
              isActive
                ? 'bg-[rgb(var(--sys-rgb))] text-[var(--sys-on)] shadow-sm'
                : 'text-zinc-500 hover:bg-white hover:text-zinc-800 hover:shadow-sm'
            )}
          >
            {Icon && <Icon size={15} className="shrink-0" />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

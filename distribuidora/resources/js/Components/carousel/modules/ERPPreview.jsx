import { TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Ventas hoy', value: 'S/ 12,450', delta: '+12.5%' },
  { label: 'Margen', value: '31.4%', delta: '+2.1%' },
];

export default function ERPPreview() {
  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-2 gap-2.5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-zinc-200 bg-white shadow-sm shadow-zinc-900/[0.04] p-3">
            <p className="text-[10px] uppercase tracking-wider text-zinc-500">{s.label}</p>
            <p className="mt-1 text-sm font-semibold text-zinc-900">{s.value}</p>
            <p className="mt-0.5 flex items-center gap-1 text-[10px] text-[rgb(var(--sys-ink-rgb))]">
              <TrendingUp size={10} />
              {s.delta}
            </p>
          </div>
        ))}
      </div>
      <div className="flex h-14 items-end gap-1.5 rounded-lg border border-zinc-200 bg-white shadow-sm shadow-zinc-900/[0.04] p-3">
        {[40, 65, 45, 80, 55, 95, 70].map((h, i) => (
          <div key={i} className="flex-1 rounded-sm bg-[rgb(var(--sys-rgb)/0.75)]" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

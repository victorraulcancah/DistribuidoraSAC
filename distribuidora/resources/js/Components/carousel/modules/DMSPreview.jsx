import { Banknote } from 'lucide-react';

const stops = [
  { client: 'Bodega San Juan', result: 'Entregado', tone: 'text-[rgb(var(--sys-ink-rgb))]' },
  { client: 'Minimarket La Rosa', result: 'Devolución', tone: 'text-amber-600' },
  { client: 'Puesto 14 · Mercado', result: 'Rechazo', tone: 'text-zinc-500' },
];

export default function DMSPreview() {
  return (
    <div className="space-y-2 rounded-lg border border-zinc-200 bg-white shadow-sm shadow-zinc-900/[0.04] p-3">
      {stops.map((s) => (
        <div key={s.client} className="flex items-center justify-between gap-3">
          <span className="truncate text-[11px] text-zinc-500">{s.client}</span>
          <span className={`shrink-0 text-[10px] font-medium ${s.tone}`}>{s.result}</span>
        </div>
      ))}
      <div className="flex items-center justify-between border-t border-dashed border-zinc-200 pt-2">
        <span className="flex items-center gap-1.5 text-[10px] text-zinc-500">
          <Banknote size={11} className="text-[rgb(var(--sys-rgb))]" />
          Liquidación del repartidor
        </span>
        <span className="text-sm font-semibold tabular-nums text-[rgb(var(--sys-ink-rgb))]">S/ 1,240</span>
      </div>
    </div>
  );
}

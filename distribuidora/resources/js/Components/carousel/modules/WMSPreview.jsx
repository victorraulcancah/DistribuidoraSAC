import { ShieldCheck } from 'lucide-react';

const racks = [
  { code: 'A-01', pct: 82 },
  { code: 'A-02', pct: 46 },
  { code: 'B-07', pct: 94 },
];

export default function WMSPreview() {
  return (
    <div className="space-y-2 rounded-lg border border-zinc-200 bg-white shadow-sm shadow-zinc-900/[0.04] p-3">
      {racks.map((r) => (
        <div key={r.code} className="flex items-center gap-3">
          <span className="w-10 shrink-0 font-mono text-[10px] text-zinc-500">{r.code}</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100">
            <div className="h-full rounded-full bg-[rgb(var(--sys-rgb)/0.7)]" style={{ width: `${r.pct}%` }} />
          </div>
          <span className="w-8 shrink-0 text-right text-[10px] tabular-nums text-zinc-500">
            {r.pct}%
          </span>
        </div>
      ))}
      <div className="flex items-center gap-1.5 border-t border-zinc-200 pt-2 text-[10px] text-zinc-500">
        <ShieldCheck size={11} className="text-[rgb(var(--sys-rgb))]" />
        1,240 SKUs conciliados
      </div>
    </div>
  );
}

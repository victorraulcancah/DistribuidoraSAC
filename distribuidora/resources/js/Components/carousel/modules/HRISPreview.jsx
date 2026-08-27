import { UserRound, Banknote } from 'lucide-react';

const team = [
  { name: 'Carlos Mendoza', role: 'Repartidor · TMS', status: 'En ruta', ok: true },
  { name: 'Lucía Torres', role: 'Almacenera · WMS', status: 'Asistió', ok: true },
  { name: 'Pedro Ramos', role: 'Vendedor · Ruta 4', status: 'Tardanza', ok: false },
];

export default function HRISPreview() {
  return (
    <div className="space-y-2 rounded-lg border border-zinc-200 bg-white shadow-sm shadow-zinc-900/[0.04] p-3">
      {team.map((p) => (
        <div key={p.name} className="flex items-center gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100">
            <UserRound size={13} className="text-zinc-700" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-medium text-zinc-800">{p.name}</p>
            <p className="truncate text-[10px] text-zinc-500">{p.role}</p>
          </div>
          <span className={`shrink-0 text-[10px] ${p.ok ? 'text-amber-600' : 'text-amber-600'}`}>
            {p.status}
          </span>
        </div>
      ))}
      <div className="flex items-center gap-1.5 border-t border-zinc-200 pt-2 text-[10px] text-zinc-500">
        <Banknote size={11} className="text-[rgb(var(--sys-rgb))]" />
        Nómina del mes: S/ 48,200 · 32 empleados
      </div>
    </div>
  );
}

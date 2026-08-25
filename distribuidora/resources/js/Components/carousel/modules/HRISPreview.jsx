import { UserRound, Banknote } from 'lucide-react';

const team = [
  { name: 'Carlos Mendoza', role: 'Repartidor · TMS', status: 'En ruta', ok: true },
  { name: 'Lucía Torres', role: 'Almacenera · WMS', status: 'Asistió', ok: true },
  { name: 'Pedro Ramos', role: 'Vendedor · Ruta 4', status: 'Tardanza', ok: false },
];

export default function HRISPreview() {
  return (
    <div className="space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/70 p-3">
      {team.map((p) => (
        <div key={p.name} className="flex items-center gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800">
            <UserRound size={13} className="text-zinc-300" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-medium text-zinc-200">{p.name}</p>
            <p className="truncate text-[10px] text-zinc-500">{p.role}</p>
          </div>
          <span className={`shrink-0 text-[10px] ${p.ok ? 'text-teal-300' : 'text-amber-300'}`}>
            {p.status}
          </span>
        </div>
      ))}
      <div className="flex items-center gap-1.5 border-t border-zinc-800 pt-2 text-[10px] text-zinc-500">
        <Banknote size={11} className="text-teal-400" />
        Nómina del mes: S/ 48,200 · 32 empleados
      </div>
    </div>
  );
}

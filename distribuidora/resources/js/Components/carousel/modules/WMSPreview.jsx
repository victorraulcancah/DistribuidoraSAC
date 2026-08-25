export default function WMSPreview() {
  const racks = [
    { id: 'A-01', zone: 'Recepción', occupancy: 85, items: 1240, color: 'sky' },
    { id: 'B-03', zone: 'Almacén', occupancy: 92, items: 3450, color: 'emerald' },
    { id: 'C-07', zone: 'Picking', occupancy: 67, items: 890, color: 'amber' },
    { id: 'D-12', zone: 'Expedición', occupancy: 45, items: 560, color: 'violet' },
    { id: 'E-04', zone: 'Frío', occupancy: 78, items: 1100, color: 'rose' },
    { id: 'F-09', zone: 'Químicos', occupancy: 34, items: 230, color: 'orange' },
  ];

  const colors = {
    sky: 'bg-sky-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    violet: 'bg-violet-500',
    rose: 'bg-rose-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-zinc-500 uppercase tracking-wide">Ocupación por Rack</p>
      <div className="space-y-2">
        {racks.map((rack) => (
          <div key={rack.id} className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${colors[rack.color]}`} />
                <span className="font-mono text-sm text-zinc-100">{rack.id}</span>
                <span className="text-xs text-zinc-500 px-2 py-0.5 bg-zinc-800 rounded">{rack.zone}</span>
              </div>
              <span className="text-sm font-medium text-zinc-300">{rack.items} items</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${colors[rack.color]}`}
                style={{ width: `${rack.occupancy}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs">
              <span className="text-zinc-500">0%</span>
              <span className="text-zinc-400 font-medium">{rack.occupancy}%</span>
              <span className="text-zinc-500">100%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
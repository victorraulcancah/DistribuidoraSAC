const stops = [
  { name: 'Almacén central', time: '08:00', done: true },
  { name: 'Bodega San Juan', time: '09:40', done: true },
  { name: 'Mercado Central', time: '11:15', done: false },
];

export default function TMSPreview() {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-3">
      {stops.map((s, i) => (
        <div key={s.name} className="flex gap-3">
          <div className="flex flex-col items-center">
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${
                s.done ? 'bg-violet-400' : 'border border-zinc-600 bg-zinc-900'
              }`}
            />
            {i < stops.length - 1 && <span className="w-px flex-1 bg-zinc-800" />}
          </div>
          <div
            className={`flex flex-1 items-center justify-between gap-3 ${
              i < stops.length - 1 ? 'pb-3' : ''
            }`}
          >
            <span className={`text-[11px] ${s.done ? 'text-zinc-400' : 'text-zinc-500'}`}>
              {s.name}
            </span>
            <span className="shrink-0 font-mono text-[10px] text-zinc-600">{s.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

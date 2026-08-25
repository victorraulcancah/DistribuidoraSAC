export default function TMSPreview() {
  const stops = [
    { time: '06:30', location: 'Centro Distribución', status: 'completed', type: 'start', address: 'Av. Industrial 123' },
    { time: '07:45', location: 'Cliente A - Supermercado', status: 'completed', type: 'delivery', address: 'Jr. Comercio 456' },
    { time: '08:30', location: 'Cliente B - Farmacia', status: 'completed', type: 'delivery', address: 'Av. Salud 789' },
    { time: '09:15', location: 'Cliente C - Ferretería', status: 'current', type: 'delivery', address: 'Calle Herramientas 321' },
    { time: '10:00', location: 'Cliente D - Tienda', status: 'pending', type: 'delivery', address: 'Av. Ventas 654' },
    { time: '11:30', location: 'Almuerzo / Descanso', status: 'pending', type: 'break', address: 'Zona de descanso' },
    { time: '12:30', location: 'Cliente E - Mayorista', status: 'pending', type: 'delivery', address: 'Jr. Mayorista 987' },
    { time: '14:00', location: 'Centro Distribución', status: 'pending', type: 'end', address: 'Av. Industrial 123' },
  ];

  const getStatusStyle = (status, index) => {
    const base = 'w-3 h-3 rounded-full border-3 border-zinc-950 z-10 flex-shrink-0';
    if (status === 'completed') return `${base} bg-emerald-500 border-emerald-500`;
    if (status === 'current') return `${base} bg-violet-500 border-violet-500 animate-pulse`;
    return `${base} bg-zinc-700 border-zinc-700`;
  };

  const getTypeIcon = (type) => {
    if (type === 'start') return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
    );
    if (type === 'delivery') return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H18v2l3-4-3-4v2h-3.04l-1.96 2.5zM18 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
    );
    if (type === 'break') return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.5 10.5h-15c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5zm0-6h-15c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5zm0 12h-15c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/></svg>
    );
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
    );
  };

  return (
    <div className="space-y-0">
      {stops.map((stop, index) => (
        <div key={index} className="flex gap-3 relative">
          <div className="flex flex-col items-center pt-1">
            <div className={getStatusStyle(stop.status, index)} />
            {index < stops.length - 1 && (
              <div className="w-0.5 h-full bg-zinc-800" style={{ marginTop: '4px', marginBottom: '4px' }} />
            )}
          </div>
          <div className="flex-1 bg-zinc-900/60 border border-zinc-800 rounded-r-lg p-3 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  stop.type === 'break' ? 'bg-amber-500/20 text-amber-400' :
                  stop.type === 'start' || stop.type === 'end' ? 'bg-violet-500/20 text-violet-400' :
                  'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {stop.type === 'break' ? 'Descanso' :
                   stop.type === 'start' ? 'Inicio' :
                   stop.type === 'end' ? 'Fin' : 'Entrega'}
                </span>
                <span className="text-sm font-medium text-zinc-100 truncate">{stop.location}</span>
              </div>
              <span className="text-xs font-mono text-zinc-400 whitespace-nowrap">{stop.time}</span>
            </div>
            <p className="text-xs text-zinc-500 mt-1 truncate">{stop.address}</p>
            {stop.status === 'current' && (
              <div className="mt-2 flex items-center gap-2 text-xs text-violet-400">
                <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
                <span>En ruta - ETA: 5 min</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
export default function ERPPreview() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Ventas', value: 'S/ 124,5K', trend: '+12.5%', color: 'emerald' },
          { label: 'Pedidos', value: '1,234', trend: '+8.2%', color: 'sky' },
          { label: 'Clientes', value: '567', trend: '+3.1%', color: 'amber' },
          { label: 'Stock', value: '89%', trend: '-2.4%', color: 'violet' },
        ].map((item, i) => (
          <div key={i} className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-4">
            <p className="text-xs text-zinc-500 uppercase tracking-wide">{item.label}</p>
            <p className="text-2xl font-bold text-zinc-100 mt-1">{item.value}</p>
            <p className={`text-xs mt-1 ${item.trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
              {item.trend} vs mes anterior
            </p>
          </div>
        ))}
      </div>
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-4 h-48">
        <p className="text-xs text-zinc-500 uppercase tracking-wide mb-4">Ventas por Canal</p>
        <div className="flex items-end justify-between h-full gap-1.5">
          {[65, 45, 78, 52, 88, 35, 72].map((height, i) => (
            <div key={i} className="flex-1 flex items-end">
              <div
                className="w-full bg-emerald-500/20 rounded-t transition-all duration-500 hover:bg-emerald-500/40"
                style={{ height: `${height}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-3 text-xs text-zinc-500">
          {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, i) => (
            <span key={i} className="w-1/7 text-center">{day}</span>
          ))}
        </div>
      </div>
    </div>
  );
}